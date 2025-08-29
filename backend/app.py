from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from models import LogEntry, SessionLocal, init_db
import monitor
import recovery

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
init_db()

@app.route("/api/log", methods=["POST"])
def ingest_log():
    data = request.json
    log = data.get("log", "")
    vehicle_id = data.get("vehicle_id", "V001")

    error = monitor.detect_error(log)
    if error:
        action_func = getattr(recovery, monitor.resolve_action(error))
        action_result = action_func(vehicle_id)
        status = "resolved"
    else:
        action_result = ""
        status = "active"

    # Store in DB
    db = SessionLocal()
    entry = LogEntry(
        vehicle_id=vehicle_id,
        log=log,
        error=error if error else "",
        action_taken=action_result,
        status=status
    )
    db.add(entry)
    db.commit()

    # Alert dashboard (WebSocket)
    socketio.emit("new_alert", {
        "vehicle_id": vehicle_id,
        "log": log,
        "error": error,
        "action_taken": action_result,
        "status": status
    })

    return jsonify({"success": True}), 200

@app.route("/api/history", methods=["GET"])
def history():
    db = SessionLocal()
    entries = db.query(LogEntry).order_by(LogEntry.timestamp.desc()).limit(100).all()
    return jsonify([
        {
            "timestamp": e.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
            "vehicle_id": e.vehicle_id,
            "log": e.log,
            "error": e.error,
            "action_taken": e.action_taken,
            "status": e.status
        }
        for e in entries
    ])

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000)

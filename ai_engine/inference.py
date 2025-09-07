import os, json, requests
from joblib import load
import numpy as np
import paho.mqtt.client as mqtt

MODEL_PATH = os.getenv("MODEL_PATH", "model.pkl")
MQTT_HOST = os.getenv("MQTT_HOST", "localhost")
MQTT_PORT = int(os.getenv("MQTT_PORT", "1883"))
SUB_TOPIC = os.getenv("SUB_TOPIC", "fleet/telemetry")
ANOMALY_TOPIC = os.getenv("ANOMALY_TOPIC", "fleet/anomaly")
HEAL_TOPIC = os.getenv("HEAL_TOPIC", "fleet/heal")
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:4000")

bundle = load(MODEL_PATH)
clf, features, labels = bundle["model"], bundle["features"], bundle["labels"]

def rule_checks(doc):
    rules = []
    if doc["engine_temp_c"] > 110: rules.append("overheating")
    if doc["tire_pressure_psi"] < 25: rules.append("low_tire_pressure")
    if doc["fuel_level_pct"] < 8: rules.append("low_fuel")
    if doc["vibration_idx"] > 60: rules.append("high_vibration")
    if doc["speed_kph"] < 1: rules.append("stalled")
    return rules

def to_feature_vector(doc):
    return np.array([[doc[k] for k in features]])

def on_message(client, userdata, msg):
    try:
        doc = json.loads(msg.payload.decode("utf-8"))
        pred_id = int(clf.predict(to_feature_vector(doc))[0])
        pred_label = labels[pred_id]
        rules = rule_checks(doc)
        is_anomaly = pred_label != "normal" or len(rules) > 0

        result = {
            "vehicle_id": doc.get("vehicle_id"),
            "timestamp": doc.get("timestamp"),
            "predicted": pred_label,
            "rules": rules,
            "features": {k: doc.get(k) for k in features},
            "gps": doc.get("gps"),
            "profile": doc.get("profile"),
        }

        if is_anomaly:
            client.publish(ANOMALY_TOPIC, json.dumps(result))
            try: requests.post(f"{BACKEND_URL}/fleet/anomaly", json=result, timeout=2)
            except: pass

            action = None
            if "overheating" in [pred_label]+rules: action = {"action":"reduce_engine_load"}
            elif "low_tire_pressure" in [pred_label]+rules: action = {"action":"inflate_tire"}
            elif "low_fuel" in [pred_label]+rules: action = {"action":"reroute_to_fuel_station"}
            elif "high_vibration" in [pred_label]+rules: action = {"action":"reduce_speed"}
            elif "stalled" in [pred_label]+rules: action = {"action":"attempt_restart"}
            if action:
                heal_msg = {"vehicle_id": doc.get("vehicle_id"), "timestamp": doc.get("timestamp"), "action": action}
                client.publish(HEAL_TOPIC, json.dumps(heal_msg))
                try: requests.post(f"{BACKEND_URL}/fleet/heal", json=heal_msg, timeout=2)
                except: pass

        try: requests.post(f"{BACKEND_URL}/fleet/data", json=doc, timeout=2)
        except: pass

    except Exception as e:
        print("Error:", e)

def main():
    client = mqtt.Client()
    client.on_message = on_message
    client.connect(MQTT_HOST, MQTT_PORT, 60)
    client.subscribe(SUB_TOPIC)
    print(f"Listening to {SUB_TOPIC} at {MQTT_HOST}:{MQTT_PORT}")
    client.loop_forever()

if __name__ == "__main__":
    main()

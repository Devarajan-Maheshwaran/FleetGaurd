import os, time, json, random, argparse
from generator import gen_vehicle_state
import paho.mqtt.client as mqtt

BROKER_HOST = os.getenv("MQTT_HOST", "localhost")
BROKER_PORT = int(os.getenv("MQTT_PORT", "1883"))
TOPIC = os.getenv("MQTT_TOPIC", "fleet/telemetry")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--vehicles", type=int, default=5)
    parser.add_argument("--interval", type=float, default=1.0)
    args = parser.parse_args()

    client = mqtt.Client()
    client.connect(BROKER_HOST, BROKER_PORT, 60)
    vehicle_ids = [f"veh-{i:03d}" for i in range(1, args.vehicles + 1)]

    try:
        while True:
            for vid in vehicle_ids:
                profile = random.choice(["idle", "city", "highway"])
                msg = gen_vehicle_state(vid, profile)
                client.publish(TOPIC, payload=json.dumps(msg))
            time.sleep(args.interval)
    except KeyboardInterrupt:
        pass

if __name__ == "__main__":
    main()

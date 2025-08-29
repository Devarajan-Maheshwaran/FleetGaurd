import requests
import time
import random

ERRORS = [
    "GPS_DISCONNECTED",
    "NETWORK_FAILURE",
    "ROUTE_MISMATCH"
]
NORMAL_LOGS = [
    "GPS position updated",
    "Network stable",
    "Route optimized"
]

API_URL = "http://localhost:5000/api/log"

while True:
    vehicle_id = "TRUCK_" + str(random.randint(1, 5))
    if random.random() < 0.3:
        # Simulate error
        log = random.choice(ERRORS)
    else:
        log = random.choice(NORMAL_LOGS)

    payload = {"vehicle_id": vehicle_id, "log": log}
    try:
        requests.post(API_URL, json=payload)
        print(f"Sent: {payload}")
    except Exception as e:
        print("API error:", e)
    time.sleep(random.randint(1, 3))

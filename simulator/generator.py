import random
import json
from datetime import datetime

DRIVING_PROFILES = {
    "idle": {"engine_temp": (60, 75), "tire_pressure": (30, 35), "fuel": (95, 100), "vibration": (0, 10), "speed": (0, 5)},
    "city": {"engine_temp": (75, 95), "tire_pressure": (28, 36), "fuel": (30, 90), "vibration": (10, 40), "speed": (10, 55)},
    "highway": {"engine_temp": (85, 110), "tire_pressure": (30, 40), "fuel": (20, 90), "vibration": (5, 25), "speed": (55, 100)},
}

def gen_vehicle_state(vehicle_id: str, profile: str):
    p = DRIVING_PROFILES[profile]
    engine_temp = round(random.uniform(*p["engine_temp"]), 2)
    tire_pressure = round(random.uniform(*p["tire_pressure"]), 2)
    fuel_level = round(random.uniform(*p["fuel"]), 2)
    vibration = round(random.uniform(*p["vibration"]), 2)
    speed = round(random.uniform(*p["speed"]), 2)
    lat = round(random.uniform(-90, 90), 6)
    lon = round(random.uniform(-180, 180), 6)

    anomaly = None
    r = random.random()
    if r < 0.02: anomaly, engine_temp = "overheating", random.uniform(110, 130)
    elif r < 0.04: anomaly, tire_pressure = "low_tire_pressure", random.uniform(15, 24)
    elif r < 0.06: anomaly, fuel_level = "low_fuel", random.uniform(0, 8)
    elif r < 0.07: anomaly, vibration = "high_vibration", random.uniform(60, 100)
    elif r < 0.08: anomaly, speed = "stalled", 0.0

    return {
        "vehicle_id": vehicle_id,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "engine_temp_c": engine_temp,
        "tire_pressure_psi": tire_pressure,
        "fuel_level_pct": fuel_level,
        "vibration_idx": vibration,
        "speed_kph": speed,
        "gps": {"lat": lat, "lon": lon},
        "profile": profile,
        "simulated_anomaly": anomaly,
    }

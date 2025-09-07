import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from joblib import dump

LABELS = ["normal","overheating","low_tire_pressure","low_fuel","high_vibration","stalled"]

def synthesize(n=20000, seed=42):
    rng = np.random.default_rng(seed)
    profiles = rng.choice(["idle","city","highway"], size=n, p=[0.2,0.5,0.3])

    engine_temp = np.where(profiles=="idle", rng.uniform(60,75,n),
                    np.where(profiles=="city", rng.uniform(75,95,n), rng.uniform(85,110,n)))
    tire_pressure = np.where(profiles=="idle", rng.uniform(30,35,n),
                      np.where(profiles=="city", rng.uniform(28,36,n), rng.uniform(30,40,n)))
    fuel = rng.uniform(20,100,n)
    vibration = np.where(profiles=="idle", rng.uniform(0,10,n),
                  np.where(profiles=="city", rng.uniform(10,40,n), rng.uniform(5,25,n)))
    speed = np.where(profiles=="idle", rng.uniform(0,5,n),
               np.where(profiles=="city", rng.uniform(10,55,n), rng.uniform(55,110,n)))

    y = np.zeros(n, dtype=int)
    y[engine_temp > 105] = 1
    y[tire_pressure < 25] = 2
    y[fuel < 8] = 3
    y[vibration > 60] = 4
    y[speed < 1] = 5

    X = np.column_stack([engine_temp, tire_pressure, fuel, vibration, speed])
    cols = ["engine_temp_c","tire_pressure_psi","fuel_level_pct","vibration_idx","speed_kph"]
    df = pd.DataFrame(X, columns=cols)
    df["label"] = y
    return df

def train_and_save(out_path="model.pkl", seed=42):
    df = synthesize(seed=seed)
    X = df.drop(columns=["label"])
    y = df["label"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=seed, stratify=y)
    clf = RandomForestClassifier(n_estimators=200, random_state=seed, class_weight="balanced")
    clf.fit(X_train, y_train)
    y_pred = clf.predict(X_test)
    print(classification_report(y_test, y_pred, target_names=LABELS))
    dump({"model": clf, "features": list(X.columns), "labels": LABELS}, out_path)
    print(f"Saved model to {out_path}")

if __name__ == "__main__":
    train_and_save()


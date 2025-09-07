import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function VehicleMap({ telemetry }) {
  const center = [20, 78]; // default: India
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow h-[400px]">
      <h2 className="text-lg font-semibold mb-2">Vehicle Map</h2>
      <MapContainer center={center} zoom={3} className="h-full w-full rounded-lg">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {telemetry.map((t, i) => (
          <Marker key={i} position={[t.gps?.lat || 0, t.gps?.lon || 0]}>
            <Popup>
              <b>{t.vehicle_id}</b><br />
              {t.predicted || "normal"}<br />
              Speed: {t.speed_kph}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

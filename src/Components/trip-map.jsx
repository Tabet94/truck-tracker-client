import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";

const MapTrip = ({ trip }) => {
  if (!trip) return null;

  // Extract coordinates
  const points = [
    [trip.current_location.latitude, trip.current_location.longitude],
    [trip.pickup_location.latitude, trip.pickup_location.longitude],
    [trip.dropoff_location.latitude, trip.dropoff_location.longitude],
  ];

  // Default marker icon fix
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });

  return (
    <MapContainer
      center={points[0]}
      zoom={6}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {points.map((point, idx) => (
        <Marker key={idx} position={point}>
          <Popup>
            {idx === 0 && "Current Location: " + trip.current_location.name}
            {idx === 1 && "Pickup: " + trip.pickup_location.name}
            {idx === 2 && "Drop-off: " + trip.dropoff_location.name}
          </Popup>
        </Marker>
      ))}
      <Polyline positions={points} color="blue" />
    </MapContainer>
  );
};

export default MapTrip;

import React from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Исправление пути к стандартным иконкам Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Настройка иконки маркера
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ start, end, routes, setStart, setEnd, activeInput }) => {
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name || "Неизвестный адрес";
    } catch (error) {
      console.error("Ошибка при получении адреса:", error);
      return "Ошибка определения адреса";
    }
  };

  const LocationSelector = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        const address = await fetchAddress(lat, lng);

        if (activeInput === "start") {
          setStart({ address, lat, lng });
        } else if (activeInput === "end") {
          setEnd({ address, lat, lng });
        }
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={[43.238949, 76.889709]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationSelector />

      {/* Маркер начальной точки */}
      {start && (
        <Marker position={[start.lat, start.lng]}>
          <Popup>Начальная точка: {start.address}</Popup>
        </Marker>
      )}

      {/* Маркер конечной точки */}
      {end && (
        <Marker position={[end.lat, end.lng]}>
          <Popup>Конечная точка: {end.address}</Popup>
        </Marker>
      )}

      {/* Маршрут */}
      {routes.map((route, index) => (
        <Polyline key={index} positions={route.path} color="blue" />
      ))}
    </MapContainer>
  );
};

export default Map;

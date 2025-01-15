import React, { useState } from "react";
import Map from "./components/Map";
import RoutePlanner from "./components/RoutePlanner";
import SearchAndRecent from "./components/SearchAndRecent";

const App = () => {
  const [start, setStart] = useState(null); // Начальная точка
  const [end, setEnd] = useState(null); // Конечная точка
  const [routes, setRoutes] = useState([]); // Список маршрутов
  const [activeInput, setActiveInput] = useState("start");

  const handleSetRoute = async () => {
    if (!start || !end) {
      alert("Выберите начальную и конечную точки!");
      return;
    }

    const startCoords = `${start.lng},${start.lat}`;
    const endCoords = `${end.lng},${end.lat}`;
    const url = `https://router.project-osrm.org/route/v1/driving/${startCoords};${endCoords}?overview=full&geometries=geojson`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes.length > 0) {
        const route = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
        setRoutes([{ path: route }]);
      } else {
        alert("Маршрут не найден.");
      }
    } catch (error) {
      console.error("Ошибка при построении маршрута:", error);
      alert("Не удалось построить маршрут.");
    }
  };

  const handleClearRoute = () => {
    setStart(null);
    setEnd(null);
    setRoutes([]);
  };

  return (
    <div style={styles.container}>
      {/* Левая колонка */}
      <div style={styles.leftColumn}>
        <SearchAndRecent onSearch={() => {}} recentPlaces={[]} />
        <RoutePlanner
          start={start}
          end={end}
          setActiveInput={setActiveInput}
          onSetRoute={handleSetRoute}
        />
        <button style={styles.clearButton} onClick={handleClearRoute}>
          Очистить маршрут
        </button>
      </div>

      {/* Карта */}
      <div style={styles.mapContainer}>
        <Map
          start={start}
          end={end}
          routes={routes}
          setStart={setStart}
          setEnd={setEnd}
          activeInput={activeInput}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100vh",
  },
  leftColumn: {
    width: "25%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
  },
  mapContainer: {
    flex: 1,
  },
  clearButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;

import React from "react";

const RoutePlanner = ({ start, end, setActiveInput, onSetRoute }) => {
  const handleSetRoute = (e) => {
    e.preventDefault();
    onSetRoute();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Начальная точка"
        value={start?.address || ""}
        readOnly
        style={styles.input}
        onClick={() => setActiveInput("start")}
      />
      <input
        type="text"
        placeholder="Конечная точка"
        value={end?.address || ""}
        readOnly
        style={styles.input}
        onClick={() => setActiveInput("end")}
      />
      <button style={styles.button} onClick={handleSetRoute}>
        Построить маршрут
      </button>
    </div>
  );
};

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default RoutePlanner;

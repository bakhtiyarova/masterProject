import React from "react";

const SearchAndRecent = ({ onSearch, recentPlaces }) => {
  const [query, setQuery] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
    setQuery("");
  };

  return (
    <div>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          placeholder="Введите адрес или место..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Найти
        </button>
      </form>
      <div>
        <h4>Недавние места</h4>
        <ul style={styles.list}>
          {recentPlaces.map((place, index) => (
            <li key={index}>{place}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  form: {
    display: "flex",
    marginBottom: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px 0 0 5px",
    fontSize: "14px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "0 5px 5px 0",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
};

export default SearchAndRecent;

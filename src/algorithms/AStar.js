export const aStarAlgorithm = (graph, start, goal) => {
  const openSet = [start];
  const cameFrom = {};
  const gScore = { [start]: 0 };
  const fScore = { [start]: heuristicCost(start, goal) };

  while (openSet.length > 0) {
    const current = openSet.reduce((lowest, node) => (fScore[node] < fScore[lowest] ? node : lowest));

    if (current === goal) {
      return reconstructPath(cameFrom, current);
    }

    openSet.splice(openSet.indexOf(current), 1);

    if (!graph[current]) continue;

    for (const neighbor in graph[current]) {
      const tentativeGScore = gScore[current] + graph[current][neighbor];
      if (tentativeGScore < (gScore[neighbor] || Infinity)) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeGScore;
        fScore[neighbor] = tentativeGScore + heuristicCost(neighbor, goal);
        if (!openSet.includes(neighbor)) openSet.push(neighbor);
      }
    }
  }

  return null; // Если маршрут не найден
};

const heuristicCost = (start, goal) => {
  // Простая эвристика: манхэттенское расстояние (или заменить на другую при необходимости)
  const [startLat, startLng] = start.split(",").map(Number);
  const [goalLat, goalLng] = goal.split(",").map(Number);
  return Math.abs(startLat - goalLat) + Math.abs(startLng - goalLng);
};

const reconstructPath = (cameFrom, current) => {
  const path = [current];
  while (cameFrom[current]) {
    current = cameFrom[current];
    path.unshift(current);
  }
  return path;
};

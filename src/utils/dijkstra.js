export default function dijkstra(grid, start, end) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visitedOrder = [];
  const distances = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );
  const parent = new Map();
  const key = (x, y) => `${x},${y}`;
  distances[start.y][start.x] = 0;

  const pq = [{ x: start.x, y: start.y, dist: 0 }];
  const visited = new Set();

  while (pq.length) {
    pq.sort((a, b) => a.dist - b.dist);
    const node = pq.shift();
    const k = key(node.x, node.y);
    if (visited.has(k)) continue;
    visited.add(k);

    visitedOrder.push({ x: node.x, y: node.y });

    if (node.x === end.x && node.y === end.y) break;

    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    for (const [dx, dy] of directions) {
      const nx = node.x + dx;
      const ny = node.y + dy;
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < cols &&
        ny < rows &&
        !grid[ny][nx].isWall
      ) {
        const newDist = distances[node.y][node.x] + 1;
        if (newDist < distances[ny][nx]) {
          distances[ny][nx] = newDist;
          parent.set(key(nx, ny), { x: node.x, y: node.y });
          pq.push({ x: nx, y: ny, dist: newDist });
        }
      }
    }
  }

  const path = [];
  let cur = end;
  while (parent.has(key(cur.x, cur.y))) {
    path.push(cur);
    cur = parent.get(key(cur.x, cur.y));
  }
  path.push(start);
  path.reverse();

  return { visitedOrder, path };
}

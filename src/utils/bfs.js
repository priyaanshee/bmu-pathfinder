export default function bfs(grid, start, end) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visitedOrder = [];
  const queue = [start];
  const visited = new Set();
  const parent = new Map();

  const key = (x, y) => `${x},${y}`;
  visited.add(key(start.x, start.y));

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  while (queue.length) {
    const node = queue.shift();
    visitedOrder.push(node);

    if (node.x === end.x && node.y === end.y) break;

    for (const [dx, dy] of directions) {
      const nx = node.x + dx;
      const ny = node.y + dy;

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < cols &&
        ny < rows &&
        !grid[ny][nx].isWall &&
        !visited.has(key(nx, ny))
      ) {
        visited.add(key(nx, ny));
        parent.set(key(nx, ny), node);
        queue.push({ x: nx, y: ny });
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

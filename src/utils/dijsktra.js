// Simple Dijkstra implementation for our NB first floor graph

export function dijkstra(nodes, edges, startId, endId) {
  if (!startId || !endId || startId === endId) return null;

  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  // Build adjacency list with weights = Euclidean distance
  const graph = new Map();
  nodes.forEach(n => graph.set(n.id, []));
  edges.forEach(([a, b]) => {
    const na = nodeMap.get(a);
    const nb = nodeMap.get(b);
    if (!na || !nb) return;
    const w = Math.hypot(na.x - nb.x, na.y - nb.y);
    graph.get(a).push({ to: b, w });
    graph.get(b).push({ to: a, w });
  });

  const dist = new Map();
  const prev = new Map();
  const visited = new Set();

  nodes.forEach(n => dist.set(n.id, Infinity));
  dist.set(startId, 0);

  while (true) {
    let u = null;
    let best = Infinity;

    for (const [id, d] of dist.entries()) {
      if (!visited.has(id) && d < best) {
        best = d;
        u = id;
      }
    }

    if (u === null) break;
    if (u === endId) break;

    visited.add(u);

    for (const { to, w } of graph.get(u) || []) {
      const alt = dist.get(u) + w;
      if (alt < dist.get(to)) {
        dist.set(to, alt);
        prev.set(to, u);
      }
    }
  }

  if (dist.get(endId) === Infinity) return null;

  const path = [];
  let cur = endId;
  while (cur) {
    path.push(cur);
    cur = prev.get(cur);
  }
  path.reverse();

  return {
    path,
    distance: dist.get(endId)
  };
}
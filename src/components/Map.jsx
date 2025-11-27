import { useMemo, useState } from "react";
import nodes from "../data/nb_first_floor/nodes.json";
import edges from "../data/nb_first_floor/edges.json";
import { dijkstra } from "../utils/dijkstra.js";

export default function Map() {
  const [startId, setStartId] = useState("NB103");
  const [endId, setEndId] = useState("NB105");
  const [result, setResult] = useState(null);

  const nodeMap = useMemo(
    () => new Map(nodes.map(n => [n.id, n])),
    []
  );

  const rooms = nodes.filter(n => n.type === "room");
  const lifts = nodes.filter(n => n.type === "lift");
  const staircases = nodes.filter(
    n => n.type === "staircase" || n.type === "emergency_staircase"
  );

  function handleFindPath() {
    const res = dijkstra(nodes, edges, startId, endId);
    setResult(res);
  }

  function findNearestOfType(list) {
    if (!startId) return;
    let best = null;

    for (const target of list) {
      const res = dijkstra(nodes, edges, startId, target.id);
      if (!res) continue;
      if (!best || res.distance < best.distance) {
        best = { ...res, targetId: target.id };
      }
    }

    if (best) {
      setEndId(best.targetId);
      setResult(best);
    }
  }

  const pathPoints =
    result && result.path
      ? result.path
          .map(id => {
            const n = nodeMap.get(id);
            return `${n.x},${n.y}`;
          })
          .join(" ")
      : "";

  return (
    <div style={{ padding: "16px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>
        NB 1st Floor – Path Finder
      </h1>

      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "flex-start",
          flexWrap: "wrap"
        }}
      >
        {/* Controls */}
        <div
          style={{
            minWidth: "260px",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px"
          }}
        >
          <div>
            <label>Start (Room)</label>
            <br />
            <select
              value={startId}
              onChange={e => setStartId(e.target.value)}
              style={{ width: "100%", marginTop: "4px", marginBottom: "8px" }}
            >
              {rooms.map(r => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Destination (Room)</label>
            <br />
            <select
              value={endId}
              onChange={e => setEndId(e.target.value)}
              style={{ width: "100%", marginTop: "4px", marginBottom: "8px" }}
            >
              {rooms.map(r => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleFindPath} style={{ marginTop: "4px" }}>
            Find Path
          </button>

          <hr style={{ margin: "12px 0" }} />

          <div>
            <div style={{ marginBottom: "4px", fontWeight: "bold" }}>
              Quick actions
            </div>
            <button
              onClick={() => findNearestOfType(lifts)}
              style={{ marginRight: "8px", marginBottom: "4px" }}
            >
              Nearest Lift
            </button>
            <button onClick={() => findNearestOfType(staircases)}>
              Nearest Staircase
            </button>
          </div>

          <div style={{ marginTop: "12px", fontSize: "14px" }}>
            <b>Result:</b>
            {!result && (
              <div style={{ fontSize: "12px" }}>
                No path calculated yet.
              </div>
            )}
            {result && (
              <div>
                <div>
                  Distance ≈ {Math.round(result.distance)} units
                </div>
                <ol style={{ paddingLeft: "20px", fontSize: "12px" }}>
                  {result.path.map(id => {
                    const n = nodeMap.get(id);
                    return (
                      <li key={id}>
                        {n.label} ({id})
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
          </div>
        </div>

        {/* Simple drawn map */}
        <div
          style={{
            flex: 1,
            minWidth: "300px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "8px"
          }}
        >
          <svg
            viewBox="0 0 1000 600"
            width="100%"
            height="400"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* background */}
            <rect x="0" y="0" width="1000" height="600" fill="#fafafa" />

            {/* edges */}
            {edges.map(([a, b], idx) => {
              const na = nodeMap.get(a);
              const nb = nodeMap.get(b);
              if (!na || !nb) return null;
              return (
                <line
                  key={idx}
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  stroke="#ccc"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              );
            })}

            {/* highlighted path */}
            {pathPoints && (
              <polyline
                points={pathPoints}
                fill="none"
                stroke="#0070f3"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* nodes */}
            {nodes.map(n => {
              let fill = "#ffffff";
              if (n.type === "room") fill = "#ffebee";
              else if (n.type === "lift") fill = "#e3f2fd";
              else if (n.type === "staircase") fill = "#e8f5e9";
              else if (n.type === "emergency_staircase") fill = "#fff3e0";

              return (
                <g key={n.id}>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={14}
                    fill={fill}
                    stroke="#333"
                    strokeWidth="2"
                  />
                  <text
                    x={n.x + 18}
                    y={n.y + 4}
                    fontSize="14"
                    fontFamily="sans-serif"
                  >
                    {n.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

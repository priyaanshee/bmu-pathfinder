import { useState } from "react";
import Grid from "./components/Grid";
import bfs from "./utils/bfs";
import dijkstra from "./utils/dijkstra";
import Select from "react-select";


export default function App() {
  const createGrid = () =>
    Array.from({ length: 40 }, (_, y) =>
      Array.from({ length: 80 }, (_, x) => ({
        x,
        y,
        isStart: false,
        isEnd: false,
        isWall: false,
        isVisited: false,
        isPath: false,
      }))
    );

  const [grid, setGrid] = useState(createGrid());
  const [algorithm, setAlgorithm] = useState("bfs");

  function visualize() {
    let start = null;
    let end = null;

    grid.forEach((row) =>
      row.forEach((cell) => {
        if (cell.isStart) start = { x: cell.x, y: cell.y };
        if (cell.isEnd) end = { x: cell.x, y: cell.y };
      })
    );

    if (!start || !end) {
      alert("Select start (left click) and end (right click) first");
      return;
    }

    const baseGrid = grid.map((row) =>
      row.map((cell) => ({
        ...cell,
        isVisited: false,
        isPath: false,
      }))
    );

    let visitedOrder, path;

    if (algorithm === "bfs") {
      const res = bfs(baseGrid, start, end);
      visitedOrder = res.visitedOrder;
      path = res.path;
    } else if (algorithm === "dijkstra") {
      const res = dijkstra(baseGrid, start, end);
      visitedOrder = res.visitedOrder;
      path = res.path;
    } else {
      alert("Algorithm not implemented yet");
      return;
    }

    const newGrid = baseGrid.map((row) => row.map((cell) => ({ ...cell })));

    // visited animation
    visitedOrder.forEach((node, i) => {
      setTimeout(() => {
        newGrid[node.y][node.x].isVisited = true;
        setGrid(newGrid.map((row) => row.map((cell) => ({ ...cell }))));
      }, 10 * i);
    });

    // path animation (after visited)
    setTimeout(() => {
      path.forEach((node, i) => {
        setTimeout(() => {
          newGrid[node.y][node.x].isPath = true;
          setGrid(newGrid.map((row) => row.map((cell) => ({ ...cell }))));
        }, 20 * i);
      });
    }, 10 * visitedOrder.length);
  }

  const places = [
  "GA",
  "GB",
  "Library",
  "North Block",
  "Maggie Point",
  "Medical Room",
  "Mechanical Workshop",
  "Domino's",
  "Burger Singh",
  "Coffee Shop",
  "Smoothie Zone",
  "Kathi Junction"
].map(p => ({ label: p, value: p }));

const [startPlace, setStartPlace] = useState(null);
const [endPlace, setEndPlace] = useState(null);


  return (
    <div>
      <h1>BMU Pathfinding Visualizer</h1>

{/* Start location dropdown */}
<Select
  options={places}
  value={startPlace}
  onChange={setStartPlace}
  placeholder="Select Start Location"
  isSearchable
  styles={{ container: base => ({ ...base, width: "280px", margin: "0 auto 10px" }) }}
/>

{/* End location dropdown */}
<Select
  options={places}
  value={endPlace}
  onChange={setEndPlace}
  placeholder="Select Destination"
  isSearchable
  styles={{ container: base => ({ ...base, width: "280px", margin: "0 auto 20px" }) }}
/>

      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        style={{ marginRight: "10px", padding: "6px" }}
      >
        <option value="bfs">BFS</option>
        <option value="dijkstra">Dijkstra</option>
        <option value="astar">A* Search</option>
      </select>

      <button onClick={visualize} style={{ padding: "6px 12px" }}>
        Visualize
      </button>

      <Grid
        rows={40}
        cols={80}
        grid={grid}
        onStartSelect={(x, y) => {
          setGrid((prev) => {
            const copy = prev.map((row) =>
              row.map((cell) => ({ ...cell, isStart: false }))
            );
            copy[y][x].isStart = true;
            return copy;
          });
        }}
        onEndSelect={(x, y) => {
          setGrid((prev) => {
            const copy = prev.map((row) =>
              row.map((cell) => ({ ...cell, isEnd: false }))
            );
            copy[y][x].isEnd = true;
            return copy;
          });
        }}
        onWallToggle={(x, y) => {
          setGrid((prev) => {
            const copy = prev.map((row) => row.map((cell) => ({ ...cell })));
            if (!copy[y][x].isStart && !copy[y][x].isEnd) {
              copy[y][x].isWall = !copy[y][x].isWall;
            }
            return copy;
          });
        }}
      />
    </div>
  );
}

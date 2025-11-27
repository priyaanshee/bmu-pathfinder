import { useState } from "react";

export default function Grid({ rows, cols, grid, onStartSelect, onEndSelect, onWallToggle }) {
  const [mouseDown, setMouseDown] = useState(false);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 15px)`,
        gap: "1px",
        justifyContent: "center",
        marginTop: "15px",
        height: rows * 15,
      }}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
    >
      {grid.flat().map((cell) => (
        <div
          key={`${cell.x}-${cell.y}`}
          onClick={() => onStartSelect(cell.x, cell.y)}
          onContextMenu={(e) => {
            e.preventDefault();
            onEndSelect(cell.x, cell.y);
          }}
          onMouseEnter={() => {
            if (mouseDown) onWallToggle(cell.x, cell.y);
          }}
          style={{
            width: 15,
            height: 15,
            border: "1px solid #ddd",
            background:
  cell.isStart
    ? "green"
    : cell.isEnd
    ? "red"
    : cell.isPath
    ? "#002B7F"        // DARK BLUE for shortest path
    : cell.isVisited
    ? "#7EC8FF"        // LIGHT BLUE for visited nodes
    : cell.isWall
    ? "black"
    : "white",

          }}
        />
      ))}
    </div>
  );
}


export default function Navbar() {
  return (
    <header
      style={{
        background: "#0b0f1a",
        borderBottom: "1px solid #00f7ff88",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <h2 style={{ margin: 0, color: "#00f7ff" }}>BMU PathFinder</h2>
    </header>
  );
}

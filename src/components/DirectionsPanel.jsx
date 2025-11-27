export default function DirectionsPanel({ directions }) {
  return (
    <div style={{ width: "300px", textAlign: "left" }}>
      <h3>Directions</h3>
      <ul>
        {directions.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
    </div>
  );
}

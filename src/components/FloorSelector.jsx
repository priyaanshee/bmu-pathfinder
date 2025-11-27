export default function FloorSelector({ building, floor, onChange }) {
  const floors = {
    north_block: ["ground", "first", "second", "third", "fourth"],
    library: [],
    gateway_a: [],
    gateway_b: [],
  };

  return (
    <select value={floor} onChange={(e) => onChange(e.target.value)}>
      {floors[building].map((f) => (
        <option key={f} value={f}>
          {f.toUpperCase()}
        </option>
      ))}
    </select>
  );
}

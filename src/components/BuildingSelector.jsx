export default function BuildingSelector({ building, onChange }) {
  const buildings = [
    { id: "north_block", name: "North Block" },
    { id: "library", name: "Library (soon)" },
    { id: "gateway_a", name: "Gateway A (soon)" },
    { id: "gateway_b", name: "Gateway B (soon)" }
  ];

  return (
    <select value={building} onChange={(e) => onChange(e.target.value)}>
      {buildings.map((b) => (
        <option key={b.id} value={b.id}>
          {b.name}
        </option>
      ))}
    </select>
  );
}

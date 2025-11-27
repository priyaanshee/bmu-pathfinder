import { getRoomsFromFloor } from "../utils/dataLoader";

export default function RoomSelector({ building, floor, label, value, onChange }) {
  const rooms = getRoomsFromFloor(building, floor); // returns list from nodes.json

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">{label}</option>
      {rooms.map((r) => (
        <option key={r.id} value={r.id}>
          {r.label}
        </option>
      ))}
    </select>
  );
}

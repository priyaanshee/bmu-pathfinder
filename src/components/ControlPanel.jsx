import DropdownSelector from "./DropdownSelector";

export default function ControlPanel({
  startPlace,
  endPlace,
  setStartPlace,
  setEndPlace,
  places,
  onVisualize
}) {
  return (
    <div className="glass flex flex-col items-center gap-4 p-4 rounded-xl mb-6">
      <DropdownSelector
        label="Start Location"
        value={startPlace}
        onChange={setStartPlace}
        options={places}
      />

      <DropdownSelector
        label="Destination"
        value={endPlace}
        onChange={setEndPlace}
        options={places}
      />

      <button
        onClick={onVisualize}
        className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold
                   hover:bg-blue-700 transition-all duration-200"
      >
        Visualize Path
      </button>
    </div>
  );
}

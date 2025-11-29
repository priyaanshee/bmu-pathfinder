import Header from "../components/Header";
import ControlPanel from "../components/ControlPanel";
import Grid from "../components/Grid";

export default function MapPage({
  startPlace, endPlace, setStartPlace, setEndPlace,
  places, visualize, grid
}) {
  return (
    <div className="flex flex-col items-center p-6">
      <Header />
      <ControlPanel
        startPlace={startPlace}
        endPlace={endPlace}
        setStartPlace={setStartPlace}
        setEndPlace={setEndPlace}
        places={places}
        onVisualize={visualize}
      />
      <Grid grid={grid} />
    </div>
  );
}

import Navbar from "./components/Navbar";
import Map from "./components/Map";
import "./index.css";

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <div className="map-wrapper">
        <Map />
      </div>
    </div>
  );
}

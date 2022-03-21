import { MapContainer, TileLayer } from "react-leaflet";
import { observer } from "mobx-react";
import "./style.css";

const center = [-12.966901, -50.366484];

const Map = observer(() => {
  return (
    <div id="map" style={{ width: "100%", height: "100%" }}>
      <MapContainer center={center} zoom={4} preferCanvas={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
});

export default Map;

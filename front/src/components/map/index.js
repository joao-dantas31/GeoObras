import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import { observer } from "mobx-react";
import "./style.css";
const center = [-8.77, -70.55];

const Map = observer(() => {
  return (
    <div id="map" style={{ width: "100%", height: "100%" }}>
      <MapContainer center={center} zoom={7} preferCanvas={true}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay checked name="Marker with popup">
            <Marker position={center}>
              <Popup>Exemplo</Popup>
            </Marker>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
});

export default Map;

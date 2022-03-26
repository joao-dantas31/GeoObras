import {
  LayersControl,
  MapContainer,
  GeoJSON,
  TileLayer,
  LayerGroup,
} from "react-leaflet";
import "./style.css";
import "leaflet/dist/leaflet.css";
import React from "react";
import LayerStore from "../../store/layerStore";

class Map extends React.Component {
  constructor() {
    super();
    this.layerStore = new LayerStore();
    this.center = [-8.77, -70.55];
  }

  componentDidMount() {
    this.layerStore.loadLayer("municipios", () => this.forceUpdate());
  }

  render() {
    debugger;
    return (
      <div id="map" style={{ width: "100%", height: "100%" }}>
        <MapContainer center={this.center} zoom={7} preferCanvas={true}>
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.Overlay checked name="Municipios">
              <LayerGroup>
                {this.layerStore.layerMunicipio.features &&
                  this.layerStore.layerMunicipio.features.map((item) => {
                    return <GeoJSON data={item.geometry}></GeoJSON>;
                  })}
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </div>
    );
  }
}
export default Map;

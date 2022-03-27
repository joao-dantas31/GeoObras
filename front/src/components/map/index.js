import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import "./style.css";
import "leaflet/dist/leaflet.css";
import React from "react";
import LayerStore from "../../store/layerStore";
import Layer from "../layer";

class Map extends React.Component {
  constructor() {
    super();
    this.layerStore = new LayerStore();
    this.center = [-8.77, -70.55];
  }

  componentDidMount() {
    this.layerStore.loadAllLayers(() => this.forceUpdate());
  }

  renderLayers() {
    return this.layerStore.layersList.map((layer) => (
      <Layer
        name={layer.name}
        checked={layer.checked}
        geoJson={this.layerStore.layers[layer.name]}
      />
    ));
  }

  render() {
    return (
      <div id="map" style={{ width: "100%", height: "90%" }}>
        <MapContainer
          center={this.center}
          zoom={7}
          minZoom={6}
          preferCanvas={true}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            {this.renderLayers()}
          </LayersControl>
        </MapContainer>
      </div>
    );
  }
}
export default Map;

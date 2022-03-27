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

  render() {
    return (
      <div id="map" style={{ width: "100%", height: "92%" }}>
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
            <Layer
              name="Municipios"
              geoJson={this.layerStore.layers["municipios"]}
            />
            <Layer
              name="Microrregiões"
              geoJson={this.layerStore.layers["microrregioes"]}
            />
            <Layer
              name="Mesorregiões"
              geoJson={this.layerStore.layers["mesorregioes"]}
            />
          </LayersControl>
        </MapContainer>
      </div>
    );
  }
}
export default Map;

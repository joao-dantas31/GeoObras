import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import "./style.css";
import "leaflet/dist/leaflet.css";
import React from "react";
import LayerStore from "../../store/layerStore";
import Layer from "../layer";
import MapMenubar from "../menubar";

class Map extends React.Component {
  constructor() {
    super();
    this.state = { visibleFiltroSidebar: false, item: null };
    this.layerStore = new LayerStore();
    this.center = [-8.77, -70.55];

    this.loadSpatialQuery = this.loadSpatialQuery.bind(this);
    this.removeFilters = this.removeFilters.bind(this);
  }

  componentDidMount() {
    this.layerStore.loadAllLayers(() => this.forceUpdate());
  }

  removeFilters() {
    this.layerStore.layersMap.Resultado.visible = false;
    this.layerStore.layersMap.Obras.checked = true;
    this.forceUpdate();
  }

  loadSpatialQuery(spatialCondition) {
    this.layerStore.loadLayer(
      this.layerStore.layersMap.Resultado,
      () => {
        this.layerStore.layersMap.Obras.checked = false;
        this.layerStore.layersMap.Resultado.visible = true;
        this.forceUpdate();
      },
      spatialCondition
    );
  }

  renderLayers() {
    return Object.values(this.layerStore.layersMap).map((layer) => {
      if (layer.visible) {
        return (
          <Layer
            openMenu={(item) => {
              this.setState({
                item,
                visibleFiltroSidebar: true,
              });
            }}
            name={layer.resultName ? layer.resultName : layer.name}
            checked={layer.checked}
            geoJson={
              this.layerStore.layers[
                layer.resultName ? layer.resultName : layer.name
              ]
            }
          />
        );
      }
    });
  }

  render() {
    return (
      <div id="map" style={{ width: "100%", height: "100%" }}>
        <MapMenubar
          removeFilters={this.removeFilters}
          loadSpatialQuery={this.loadSpatialQuery}
          visibleFiltroSidebar={this.state.visibleFiltroSidebar}
          item={this.state.item}
          closeSidebar={() => this.setState({ visibleFiltroSidebar: false })}
        />
        <MapContainer
          center={this.center}
          zoom={7}
          minZoom={6}
          preferCanvas={true}
          style={{ height: "90%" }}
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

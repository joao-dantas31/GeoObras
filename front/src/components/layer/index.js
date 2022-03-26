import { LayerGroup, LayersControl, GeoJSON } from "react-leaflet";

const Layer = (props) => (
  <LayersControl.Overlay checked name={props.name}>
    <LayerGroup>
      {props.geoJson &&
        props.geoJson.features &&
        props.geoJson.features.map((item, index) => {
          return <GeoJSON key={index} data={item.geometry}></GeoJSON>;
        })}
    </LayerGroup>
  </LayersControl.Overlay>
);

export default Layer;

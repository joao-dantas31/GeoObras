import { LayerGroup, LayersControl, GeoJSON, Tooltip } from "react-leaflet";

const formatItem = (item) => {
  debugger;
  let properties = {};
  Object.keys(item).forEach((key) => {
    const splitedKey = key.split(".");
    if (splitedKey[0] === "properties" && splitedKey.length == 2)
      properties[splitedKey[1]] = item[key];
  });
  item.properties = properties;
};

const getTooltip = (item) => {
  formatItem(item);
  if (item && item.properties && Object.keys(item.properties).length > 0) {
    return (
      <Tooltip sticky direction="top">
        {Object.keys(item.properties).map((key) => (
          <div>
            <b>{key}: </b>
            {item.properties?.[key]}
          </div>
        ))}
      </Tooltip>
    );
  }
};

const Layer = (props) => (
  <LayersControl.Overlay checked name={props.name}>
    <LayerGroup>
      {props.geoJson &&
        props.geoJson.features &&
        props.geoJson.features.map((item, index) => {
          return (
            <GeoJSON key={index} data={item.geometry}>
              {getTooltip(item)}
            </GeoJSON>
          );
        })}
    </LayerGroup>
  </LayersControl.Overlay>
);

export default Layer;

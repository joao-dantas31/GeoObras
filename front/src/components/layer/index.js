import {
  LayerGroup,
  LayersControl,
  GeoJSON,
  Tooltip,
  Marker,
} from "react-leaflet";
import leaflet from "leaflet";

const formatItem = (item) => {
  let properties = {};
  Object.keys(item).forEach((key) => {
    const splitedKey = key.split(".");
    if (splitedKey[0] === "properties" && splitedKey.length === 2)
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

const iconObra = new leaflet.Icon({
  iconUrl: "./icon_obra.png",
});

const Layer = (props) => (
  <LayersControl.Overlay checked={props.checked} name={props.name}>
    <LayerGroup>
      {props.geoJson &&
        props.geoJson.features &&
        props.geoJson.features.map((item, index) => {
          if (item.geometry.type.includes("Point")) {
            return (
              <Marker
                position={[
                  leaflet.GeoJSON.coordsToLatLng(item.geometry.coordinates),
                ]}
                icon={iconObra}
              >
                {getTooltip(item)}
              </Marker>
            );
          } else {
            return (
              <GeoJSON key={index} data={item.geometry}>
                {getTooltip(item)}
              </GeoJSON>
            );
          }
        })}
    </LayerGroup>
  </LayersControl.Overlay>
);

export default Layer;

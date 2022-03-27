const { query } = require("../database/builder");
var parse = require("wellknown");

module.exports = {
  async getLayer(layer) {
    const result = await query(
      `select 'Feature' AS type, ogr_geometry.STAsText() as geom FROM  ${layer}`
    );

    result.forEach((item) => {
      item.geom = parse(item.geom);
    });

    const response = {
      type: "FeatureCollection",
      features: result,
    };
    return response;
  },

  async getLayerWithProperties(layer) {
    const result = await query(this.getQuery(layer));

    result.forEach((item) => {
      item.geometry = parse(item.geometry);
    });

    const response = {
      type: "FeatureCollection",
      features: result,
    };
    return response;
  },

  getQuery(layer) {
    let queryProperties = "";
    layer.properties &&
      layer.properties.forEach(
        (prop) => (queryProperties += `, ${prop} as [properties.${prop}]`)
      );

    return `select 'Feature' AS type, ogr_geometry.STAsText() as [geometry] ${queryProperties} FROM  ${layer.name}`;
  },
};

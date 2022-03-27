const { query } = require("../database/builder");
module.exports = {
  async getLayer(layer) {
    const result = await query(
      `select 'Feature' AS type, JSON_QUERY (dbo.geometry2json(ogr_geometry)) as [geometry] FROM  ${layer}`
    );

    result.forEach((item) => {
      item.geometry = JSON.parse(item.geometry);
    });

    let response = {
      type: "FeatureCollection",
      features: result,
    };
    return response;
  },

  async getLayerWithProperties(layer) {
    const result = await query(this.getQuery(layer));

    result.forEach((item) => {
      item.geometry = JSON.parse(item.geometry);
    });

    let response = {
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

    return `select 'Feature' AS type, JSON_QUERY (dbo.geometry2json(ogr_geometry)) as [geometry]${queryProperties} FROM  ${layer.name}`;
  },
};

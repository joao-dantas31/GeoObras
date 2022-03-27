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

  async getLayerWithProperties(layer, spatialCondition) {
    const result = await query(this.getQuery(layer, spatialCondition));

    result.forEach((item) => {
      item.geometry = parse(item.geometry);
    });

    const response = {
      type: "FeatureCollection",
      features: result,
    };
    return response;
  },

  getQuery(layer, spatialCondition) {
    let queryProperties = "";
    layer.properties &&
      layer.properties.forEach(
        (prop) => (queryProperties += `, l.${prop} as [properties.${prop}]`)
      );

    const spatialQuery = spatialCondition
      ? `, ${spatialCondition.table} t where t.ogr_geometry.${spatialCondition.operation}(l.ogr_geometry) = 1 and t.ogr_fid = ${spatialCondition.tableId}`
      : "";

    return `select 'Feature' AS type, l.ogr_geometry.STAsText() as [geometry] ${queryProperties} FROM  ${layer.name} l ${spatialQuery}`;
  },
};

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
    const q = this.getQuery(layer, spatialCondition);
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

    queryConditions = "";
    if (spatialCondition) {
      if (spatialCondition?.table) {
        queryConditions += `, ${spatialCondition.table} t`;
        for (let i = 2; i < spatialCondition?.numberOfTables + 1; i++) {
          queryConditions += `, ${spatialCondition.table} t${i}`;
        }
      }
      queryConditions += " where ";

      if (spatialCondition?.operation)
        queryConditions += `l.ogr_geometry.${spatialCondition.operation}(t.ogr_geometry) = 1 and `;

      if (spatialCondition?.operationQuery)
        queryConditions += spatialCondition?.operationQuery;

      if (spatialCondition?.tableId)
        queryConditions += `t.ogr_fid = ${spatialCondition.tableId}`;

      if (spatialCondition?.orderBy)
        queryConditions += ` order by ${spatialCondition.orderBy}`;
    }

    return `select ${
      spatialCondition?.limit ? `top ${spatialCondition.limit}` : ""
    } 'Feature' AS type, l.ogr_geometry.STAsText() as [geometry] ${queryProperties} FROM  ${
      layer.name
    } l ${queryConditions}`;
  },
};

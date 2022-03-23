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
};

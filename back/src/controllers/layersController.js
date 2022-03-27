const repository = require("../repository/layersRepository");

module.exports = {
  async layers(request, response) {
    const layer = request.params.layer;
    try {
      const db = await repository.getLayer(layer);
      response.status(200).json(db);
    } catch (err) {
      response.status(500).json({ message: err.message });
      console.error(err);
    }
  },

  async layersWithProperties(request, response) {
    const layer = request.body.layer;
    const spatialCondition = request.body.spatialCondition;
    try {
      const db = await repository.getLayerWithProperties(
        layer,
        spatialCondition
      );
      response.status(200).json(db);
    } catch (err) {
      response.status(500).json({ message: err.message });
      console.error(err);
    }
  },
};

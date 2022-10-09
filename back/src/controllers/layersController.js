const repository = require("../repository/layersRepository");
const {HttpError} = require("../errors/http-error");

module.exports = {
  async layers(request, response) {
    const layer = request.params.layer;
    if(!layer) {
      throw new HttpError(400, "You must send layer request param")
    }
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

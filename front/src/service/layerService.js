import axios from "axios";
import ApiEndpoints from "../constants/ApiEndpoints";
import corsHeaders from "../constants/RequestConfig";

class LayerService {
  getLayer(layer) {
    return axios.get(
      `http://localhost:8000${ApiEndpoints.layer}/${layer}`,
      corsHeaders
    );
  }

  getLayerWithProperties(layer, spatialCondition) {
    return axios.post(
      `http://localhost:8000${ApiEndpoints.layer}`,
      { layer, spatialCondition },
      corsHeaders
    );
  }
}

export default LayerService;

import axios from "axios";
import ApiEndpoints from "../constants/ApiEndpoints";
import corsHeaders from "../constants/RequestConfig";

class LayerService {
  baseUrl = window._env_.BASE_API_URL;

  getLayer(layer) {
    return axios.get(
      `${this.baseUrl}${ApiEndpoints.layer}/${layer}`,
      corsHeaders
    );
  }
}

export default LayerService;

import axios from "axios";
import ApiEndpoints from "../constants/ApiEndpoints";
import corsHeaders from "../constants/RequestConfig";

class LayerService {
  getLayer(layer) {
    const requestParams = this.buildRequestParams(layer);
    return axios.get(
      `http://localhost:8000${ApiEndpoints.layer}/${requestParams}`,
      corsHeaders
    );
  }

  buildRequestParams(params = {}) {
    const paramList = [];

    Object.keys(params).forEach((key) => {
      if (params[key] !== null && params[key] !== undefined) {
        paramList.push(`${key}=${encodeURIComponent(params[key])}`);
      }
    });

    return paramList.length > 0 ? "?" + paramList.join("&") : "";
  }
}

export default LayerService;

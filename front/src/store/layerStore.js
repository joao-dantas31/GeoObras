import { makeObservable, observable, runInAction } from "mobx";
import LayerService from "../service/layerService";

class LayerStore {
  layers = {};
  loading = false;
  layersList = [
    { name: "microrregioes", properties: ["cd_micro", "nm_micro"] },
    { name: "municipios", properties: ["cd_mun", "nm_mun", "area_km2"] },
    { name: "mesorregioes", properties: ["cd_meso", "nm_meso"] },
  ];

  constructor() {
    makeObservable(this, {
      loading: observable,
    });
    this.service = new LayerService();
  }

  loadAllLayers(callback) {
    this.layersList.forEach((layer) => this.loadLayer(layer, callback));
  }

  loadLayer(layer, callback) {
    this.loading = true;

    this.service
      .getLayerWithProperties(layer)
      .then((response) =>
        runInAction(() => (this.layers[layer.name] = response.data))
      )
      .catch((error) => runInAction(() => console.error(error)))
      .finally(() => {
        this.loading = false;
        callback && callback();
      });
  }
}

export default LayerStore;

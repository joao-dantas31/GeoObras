import { makeObservable, observable, runInAction } from "mobx";
import LayerService from "../service/layerService";

class LayerStore {
  layerMunicipio = null;
  loading = false;
  layersList = ["municipios", "microrregioes", "mesorregioes"];

  constructor() {
    makeObservable(this, {
      layerMunicipio: observable,
      loading: observable,
    });
    this.service = new LayerService();
  }

  loadLayer(layer) {
    this.loading = true;
    this.service
      .getLayer(layer)
      .then((response) =>
        runInAction(() => {
          this.layerMunicipio = response.data;
        })
      )
      .catch((error) => runInAction(() => console.error(error)))
      .finally(() => (this.loading = false));
  }
}

export default LayerStore;

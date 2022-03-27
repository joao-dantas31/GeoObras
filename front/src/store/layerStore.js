import { makeObservable, observable, runInAction } from "mobx";
import LayerService from "../service/layerService";

class LayerStore {
  layers = {};
  loading = false;
  layersList = [
    { name: "Mesorregioes", properties: ["cd_meso", "nm_meso"] },
    { name: "Microrregioes", properties: ["cd_micro", "nm_micro"] },
    { name: "Municipios", properties: ["cd_mun", "nm_mun", "area_km2"] },
    {
      name: "Obras",
      properties: [
        "id",
        "Descricao",
        "Tipo",
        "Categoria",
        "Valor",
        "Data_inicio",
        "Finalizada",
      ],
    },
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

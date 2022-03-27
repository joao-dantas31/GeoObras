import { makeObservable, observable, runInAction } from "mobx";
import LayerService from "../service/layerService";

class LayerStore {
  layers = {};
  loading = false;
  baseResultLayer = {
    name: "Obras",
    resultName: "Resultado",
    checked: true,
    properties: [
      "id",
      "Descricao",
      "Tipo",
      "Categoria",
      "Valor",
      "Data_inicio",
      "Finalizada",
    ],
  };

  layersMap = {
    Mesorregioes: {
      name: "Mesorregioes",
      checked: true,
      properties: ["cd_meso", "nm_meso"],
    },
    Microrregioes: {
      name: "Microrregioes",
      checked: false,
      properties: ["cd_micro", "nm_micro"],
    },
    Municipios: {
      name: "Municipios",
      checked: false,
      properties: ["cd_mun", "nm_mun", "area_km2"],
    },
    Obras: {
      name: "Obras",
      checked: true,
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
  };

  constructor() {
    makeObservable(this, {
      loading: observable,
    });
    this.service = new LayerService();
  }

  loadAllLayers(callback) {
    Object.values(this.layersMap).forEach((layer) =>
      this.loadLayer(layer, callback)
    );
  }

  loadLayer(layer, callback, spatialCondition) {
    this.loading = true;

    this.service
      .getLayerWithProperties(layer, spatialCondition)
      .then((response) =>
        runInAction(() => {
          this.layers[layer.resultName ? layer.resultName : layer.name] =
            response.data;
        })
      )
      .catch((error) =>
        runInAction(() => {
          console.error(error);
        })
      )
      .finally(() => {
        this.loading = false;
        callback && callback();
      });
  }
}

export default LayerStore;

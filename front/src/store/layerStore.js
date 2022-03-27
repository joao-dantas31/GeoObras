import { makeObservable, observable, runInAction } from "mobx";
import LayerService from "../service/layerService";

class LayerStore {
  layers = {};
  loading = false;

  layersMap = {
    Mesorregioes: {
      name: "Mesorregioes",
      visible: true,
      checked: true,
      properties: ["cd_meso", "nm_meso", "ogr_fid"],
    },
    Microrregioes: {
      name: "Microrregioes",
      visible: true,
      checked: false,
      properties: ["cd_micro", "nm_micro", "ogr_fid"],
    },
    Municipios: {
      name: "Municipios",
      visible: true,
      checked: false,
      properties: ["cd_mun", "nm_mun", "area_km2", "ogr_fid"],
    },
    Obras: {
      name: "Obras",
      visible: true,
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
    Resultado: {
      name: "Obras",
      resultName: "Resultado",
      visible: false,
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
    Object.values(this.layersMap).forEach(
      (layer) => layer.visible && this.loadLayer(layer, callback)
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

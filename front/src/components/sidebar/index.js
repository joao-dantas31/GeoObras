import React from "react";
import { Sidebar } from "primereact/sidebar";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

class FiltroSidebar extends React.Component {
  constructor() {
    super();

    this.state = { bufferSize: null };
  }

  getButtons() {
    return [
      {
        name: `Obras dentro de ${this.getNameField(this.props.item?.type)}`,
        operation: "STWithin",
      },
      {
        name: `Obras fora de ${this.getNameField(this.props.item?.type)}`,
        operation: "STDisjoint",
      },
      {
        name: `Obras nas(os) ${
          this.props.item?.type
        } vizinhos de ${this.getNameField(this.props.item?.type)}`,
        operationQuery:
          " t2.ogr_geometry.STTouches(t.ogr_geometry) = 1 and l.ogr_geometry.STWithin(t2.ogr_geometry) = 1 and ",
        numberOfTables: 2,
      },
      {
        name: `5 obras mais proximas do centroide de ${this.getNameField(
          this.props.item?.type
        )}`,
        orderBy: "l.ogr_geometry.STDistance(t.ogr_geometry.STCentroid())",
        limit: 5,
      },
    ];
  }

  getNameField(type) {
    const fieldNames = {
      Microrregioes: "nm_micro",
      Mesorregioes: "nm_meso",
      Municipios: "nm_mun",
    };
    return this.props.item?.item?.properties[fieldNames[type]];
  }

  renderButtons() {
    return this.getButtons().map((button) => {
      return (
        <Button
          label={button.name}
          style={{ width: "100%", marginBottom: "5px" }}
          className="p-button-outlined "
          onClick={() =>
            this.props.loadSpatialQuery({
              table: this.props.item?.type,
              operation: button.operation,
              tableId: this.props.item?.item?.properties.ogr_fid,
              orderBy: button.orderBy,
              limit: button.limit,
              numberOfTables: button.numberOfTables,
              operationQuery: button.operationQuery,
            })
          }
        />
      );
    });
  }

  renderFuncionsObras() {
    return (
      <>
        Bufer da obra selecionada:
        <InputNumber
          placeholder="Digite o tamanho do buffer em Km"
          value={this.state.bufferSize}
          style={{ width: "100%", marginBottom: "5px" }}
          onChange={(e) => this.setState({ bufferSize: e.value })}
        />
        <Button
          label={`Buffer de obra selecionada`}
          style={{ width: "100%", marginBottom: "5px" }}
          className="p-button-outlined "
          onClick={() =>
            this.props.loadSpatialQuery({
              table:
                this.props?.item?.type == "Resultado"
                  ? "Obras"
                  : this.props?.item?.type,
              operationQuery: `t.ogr_geometry.STWithin(l.ogr_geometry.STBuffer(${
                this.state.bufferSize / 111.11
              })) = 1 and `,
              tableId: this.props?.item?.item?.properties.ogr_fid,
            })
          }
        />
      </>
    );
  }

  render() {
    return (
      <>
        <Sidebar
          visible={this.props.visibleFiltroSidebar}
          modal={false}
          name
          onHide={() => this.props.toggleFiltroSidebar()}
          icons={<b style={{ textAlign: "left" }}> Consulta Espacial </b>}
          dismissable={true}
        >
          {this.props?.item?.type === "Obras" ||
          this.props?.item?.type === "Resultado"
            ? this.renderFuncionsObras()
            : this.renderButtons()}
        </Sidebar>
      </>
    );
  }
}

export default FiltroSidebar;

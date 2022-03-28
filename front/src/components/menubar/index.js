import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import FiltroSidebar from "../sidebar";

class MapMenubar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div
        style={{
          height: "10%",
          marginLeft: this.props.visibleFiltroSidebar ? "20rem" : 0,
        }}
      >
        <Menubar
          style={{ height: "100%" }}
          start={
            <>
              <Button
                className="p-button-outlined p-button-rounded mr-2"
                icon="pi pi-home"
                onClick={() => window.location.reload()}
              />
              <Button
                className="p-button-outlined p-button-rounded mr-2"
                icon="pi pi-filter-slash"
                tooltip="Remover filtros"
                onClick={() => this.props.removeFilters()}
              />
            </>
          }
          end={
            <>
              <InputText
                placeholder={"Busque por obras"}
                icon="pi pi-power-off"
              />
              <Button
                icon="pi pi-search"
                className="p-button-rounded p-button-text"
              />
            </>
          }
        />
        <FiltroSidebar
          loadSpatialQuery={this.props.loadSpatialQuery}
          item={this.props.item}
          visibleFiltroSidebar={this.props.visibleFiltroSidebar}
          toggleFiltroSidebar={this.props.closeSidebar}
        />
      </div>
    );
  }
}

export default MapMenubar;

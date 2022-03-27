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
    this.state = { visibleFiltroSidebar: false };
    this.toggleFiltroSidebar = this.toggleFiltroSidebar.bind(this);
  }

  toggleFiltroSidebar() {
    debugger;
    this.setState((prevState) => ({
      visibleFiltroSidebar: !prevState.visibleFiltroSidebar,
    }));
  }

  render() {
    return (
      <div
        style={this.state.visibleFiltroSidebar ? { marginLeft: "23.5%" } : {}}
      >
        <div>
          <Menubar
            start={
              <>
                <Button
                  className="p-button-outlined p-button-rounded mr-2"
                  icon="pi pi-home"
                  onClick={() => window.location.reload()}
                />
                <Button
                  className="p-button-outlined p-button-rounded mr-2"
                  icon="pi pi-filter-fill"
                  tooltip="Filtros personalizados"
                  onClick={this.toggleFiltroSidebar}
                />
                <Button
                  className="p-button-outlined p-button-rounded mr-2"
                  icon="pi pi-eye"
                  tooltip="Listagem de obras"
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
        </div>
        <FiltroSidebar
          visibleFiltroSidebar={this.state.visibleFiltroSidebar}
          toggleFiltroSidebar={this.toggleFiltroSidebar}
        />
      </div>
    );
  }
}

export default MapMenubar;

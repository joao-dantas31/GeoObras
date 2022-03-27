import React from "react";
import { Sidebar } from "primereact/sidebar";
import { Accordion, AccordionTab } from "primereact/accordion";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Button } from "primereact/button";

class FiltroSidebar extends React.Component {
  constructor() {
    super();
  }

  getButtons() {
    return [
      {
        name: `Obras dentro de ${this.getNameField(this.props.item?.type)}`,
        functionName: "STWithin",
      },
      {
        name: `Obras fora de ${this.getNameField(this.props.item?.type)}`,
        functionName: "STDisjoint",
      },
      {
        name: `Obras mais proximas de ${this.getNameField(
          this.props.item?.type
        )}`,
        functionName: "STDistance",
      },
      {
        name: ` Buffer de obras da região selecionada`,
        functionName: "STWithin",
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
              operation: button.functionName,
              tableId: this.props.item?.item?.properties.ogr_fid,
            })
          }
        />
      );
    });
  }

  render() {
    return (
      <>
        <Sidebar
          visible={this.props.visibleFiltroSidebar}
          modal={false}
          name
          onHide={() => this.props.toggleFiltroSidebar()}
          icons={<b> Escolha uma Consulta Espacial </b>}
          dismissable={true}
        >
          {this.renderButtons()}
        </Sidebar>
      </>
    );
  }
}

export default FiltroSidebar;

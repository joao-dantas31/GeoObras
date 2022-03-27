import React from "react";
import { Sidebar } from "primereact/sidebar";
import { Accordion, AccordionTab } from "primereact/accordion";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

class FiltroSidebar extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
        <Sidebar
          visible={this.props.visibleFiltroSidebar}
          modal={false}
          onHide={() => this.props.toggleFiltroSidebar()}
          icons={<b> Filtros Personalizados </b>}
          dismissable={true}
        >
          <Accordion>
            <AccordionTab header="Fazer um buffer"></AccordionTab>
            <AccordionTab header="Operador Topológico 1"></AccordionTab>
            <AccordionTab header="Operador Topológico 2"></AccordionTab>
            <AccordionTab header="Operador Topológico 3"></AccordionTab>
            <AccordionTab header="Consulta métrica"></AccordionTab>
          </Accordion>
        </Sidebar>
      </>
    );
  }
}

export default FiltroSidebar;

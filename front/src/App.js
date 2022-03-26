import React from "react";

import Map from "./components/map";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = { visibleLeft: false };
  }
  render() {
    return (
      <>
        <Button
          icon="pi pi-arrow-right"
          onClick={() => this.setState({ visibleLeft: true })}
          className="mr-2"
        ></Button>

        <Map></Map>

        <Sidebar
          visible={this.state.visibleLeft}
          onHide={() => this.setState({ visibleLeft: false })}
        ></Sidebar>
      </>
    );
  }
}

export default App;

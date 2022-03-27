import React from "react";
import Map from "./components/map";
import { Sidebar } from "primereact/sidebar";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import MapMenubar from "./components/menubar";

class App extends React.Component {
  constructor() {
    super();
    this.state = { visibleLeft: false };
  }
  render() {
    return (
      <>
        <MapMenubar />
        <Map></Map>
      </>
    );
  }
}

export default App;

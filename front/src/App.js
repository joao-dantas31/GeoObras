import React from "react";
import "primeicons/primeicons.css";
import { PrimeIcons } from "primereact/api";
import Map from "./components/map";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = { visibleLeft: true };
  }
  render() {
    return (
      <div className="card">
        <h1 style={{ textAlign: "center" }}> GeoObras</h1>
        <Sidebar
          style={{ backgroundColor: "white" }}
          visible={this.state.visibleLeft}
          onHide={() => this.setState({ visibleLeft: false })}
          header={"sdjbsdn"}
        >
          <div></div>
        </Sidebar>

        <Button
          icon={PrimeIcons.INFO}
          onClick={() => this.setState({ visibleLeft: true })}
          className="mr-2"
        />
        <Map></Map>
      </div>
    );
  }
}

export default App;

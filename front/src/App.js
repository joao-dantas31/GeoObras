import React from "react";
import Map from "./components/map";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
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
        <div style={{ backgroundColor: "#0C67B3" }}>
          <Button
            icon="pi pi-align-justify"
            onClick={() => this.setState({ visibleLeft: true })}
            className="p-button-outlined p-button-rounded mr-2"
            style={{ color: "white" }}
          ></Button>

          <>
            <b
              style={{
                color: "#BCE0F9",
                fontFamily: "Arial",
                fontSize: "28px",
                fontWeight: "bold",
                marginLeft: "25%",
              }}
            >
              Geo
            </b>
            <b
              style={{
                color: "#0098DA",
                fontFamily: "Arial",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            >
              Obras
            </b>
          </>
        </div>
        <div>
          <Map></Map>
        </div>
        <Sidebar
          visible={this.state.visibleLeft}
          onHide={() => this.setState({ visibleLeft: false })}
        ></Sidebar>
      </>
    );
  }
}

export default App;

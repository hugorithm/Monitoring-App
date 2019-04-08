import React, { Component } from "react";
import Menu from "./menu";
class App extends Component {
  render() {
    let links = [
      { label: "Home", link: "#home" },
      { label: "about", link: "#about" },
      { label: "Portfolio", link: "#portfolio" },
      { label: "Contact Us", link: "#contact-us" }
    ];
    return (
      <div className="container center">
        <Menu links={links} />
      </div>
    );
  }
}
export default App;

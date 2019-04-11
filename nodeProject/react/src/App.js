import React, { Component } from "react";
import Menu from "./menu";
import { connect, ping_time } from "./socket";

class App extends Component {

  constructor() {
    this.state = {
      data: [],
      newPing:''
    }

      
    this.setState({ 
      pings: [] });
    connect(message => {
      //dunno
    })
    ping_time(data => {
      var nome = data.username;
      var a = [];

      this.setState({pings})
    })
  }


  handler(nome, data, ping) {
    this.setState({ nome: [this.state.nome, data + ping] });
  }
  handler = this.handler.bind(this);

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

        {this.state.pings === null &&
          <h1>empty</h1>
        }
        {this.state.pings !== null &&
          <Dados pings={this.state.pings} />
        }
      </div>
    );
  }
}
export default App;

class Dados extends Component {
  render() {
    return (<div classname="dados">
      <h1>ping</h1>
    </div>);
  }
}
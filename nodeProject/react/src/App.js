import React, { Component } from "react";
import Menu from "./menu";
import { connect, ping_time } from "./socket";

class App extends Component {

  constructor() {
    // this.state = {
    //   pings : [],
    //   pings2 : []
    // }
    super();

    this.state = {google:{data:2019, ping:30}};

    // {google:[{data:2019, ping:30}, {data:2019, ping:25}]};

    //   this.setState({ 
    //     pings: [] });
    //   connect(message => {
    //     //dunno
    //   })
    ping_time(data => {
      var api_name = data.name;
      this.state[api_name] = data.model;
    });

  }


  render() {
    let links = [
      { label: "Home", link: "#home" },
      { label: "about", link: "#about" },
      { label: "Portfolio", link: "#portfolio" },
      { label: "Contact Us", link: "#contact-us" }
    ];
    console.log("this.state estado : " + this.state);
    var a = JSON.stringify(this.state);
    console.log("keys : " + Object.keys(this.state));
    console.log("json : " + a);
    console.log(this.state["pings"]);
    return (
      <div className="container center">
        <Menu links={links} />

        {this.state === {} &&
          <h1>empty</h1>
        }
        {this.state !== {} &&
          <Dados pings={this.state} />
        }
      </div>
    );
  }
}
export default App;

class Dados extends Component {
  constructor(props)
  {
    super(props);
    this.state = props;
    console.log("pings : " + this.state.pings);
  }
  render() {
    var b = this.state.pings;
   var a =  Object.keys(this.state.pings).map(function(name){
      return <h1>Nome:{name}, Data: {b[name].data}, Ping: {b[name].ping}</h1>
    });
    return a;
}
}
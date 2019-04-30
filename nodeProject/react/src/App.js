import React, { Component } from "react";
import { connect, ping_time } from "./socket";
import NVD3Chart from 'react-nvd3';
import d3 from 'd3';

import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3000");

class App extends Component {


  constructor(props) {
    // this.state = {
    //   pings : [],
    //   pings2 : []
    // }
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    socket.on("update_data", data => {
      console.log("testes");
      this.setState(data);
      console.log(JSON.stringify(this.state));
      this.forceUpdate();
    });
    //Maybe adicionar update requeste para 1 client
      socket.emit("request_data_from_server");
  }

  render() {
    
    console.log("estado atual : " + this.state);

    var i = 0;

    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">ApiMonitor</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#config">Config</a>
          </li>
        </ul>
      </nav>
        <br/>
        <div className="container">
        <div className="row">
        
          {this.state.data.map(m => {
            var ret = [m];
            i++;
            return (
              <div className = "col-sm-6 col-md-3 col-lg-4 col-xs-12" >
              <div className = "card">
                <div className="card-header">{m.key}</div>
                <div className="card-body">
                <NVD3Chart key={i} type="lineChart" datum={ret} x="data" y="ping"
                  useInteractiveGuideline={true}
                  // containerStyle={{ width: "150px" }} 
                  />
              </div>
              </div>
              </div>
            )
          })}
        </div>
        </div>
</div>
    );
  }
}
export default App;

class Dados extends Component {
  constructor(props) {
    super(props);
    this.state = props;
    console.log("pings : " + this.state.pings);
  }
  render() {
    var b = this.state.pings;
    var a = Object.keys(this.state.pings).map(function (name) {
      return <h1>Nome:{name}, Data: {b[name].data}, Ping: {b[name].ping}</h1>
    });
    return a;
  }
}
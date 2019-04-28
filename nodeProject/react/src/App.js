import React, { Component } from "react";
import Menu from "./menu";
import { connect, ping_time } from "./socket";
import NVD3Chart from 'react-nvd3';
import d3 from 'd3';


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

  componentDidMount() {
    this.getData();
  }

  getData() {
    //socket.io buscar os dados.
    this.setState({
      data: [{
        key: "google",
        values: [{
          "data": 1,
          "valor": 5
        }, {
          "data": 2,
          "valor": 6
        }],
      },
      {
        key: "youtube",
        values: [{
          "data": 1,
          "valor": 2
        }, {
          "data": 2,
          "valor": 5
        }, {
          "data": 3,
          "valor": 6
        }, {
          "data": 4,
          "valor": 2
        }, {
          "data": 5,
          "valor": 0
        }]
      }]
    });

    // var _apiName = [];
    // for(var entry in data){
    //   if (data.hasOwnProperty(entry)) {   
    //     _apiName.push(data[entry].values);
    //   }               
    // }
    // console.log("Nomes: "+_apiName)

    //       // for(var entry in _apiName){


    //       // }

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
    var i = 0;
    var context = {

    }

    return (
      <div>
      <div className="container center">
        <Menu links={links} />

        {/* {this.state === {} &&
          <h1>empty</h1>
        }
        {this.state !== {} &&
          <Dados pings={this.state} />
        } */}
        {/* <Chart chartData={this.state.chartData}/> */}
        </div>
        <div>
          {this.state.data.map(m => {
            var ret = [m];
            i++;
            return (
              <div>
                <h3>{m.key}</h3>
                <NVD3Chart key={i} type="lineChart" datum={ret} x="data" y="valor"
                  useInteractiveGuideline={true}
                  //containerStyle={{ height: "500px" }} 
                  />
              </div>
            )
          })}
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
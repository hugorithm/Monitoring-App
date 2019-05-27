import React from "react";
import NVD3Chart from 'react-nvd3';
import * as d3 from 'd3';
import openSocket from "socket.io-client";




const socket = openSocket("http://localhost:3000");

export class Home extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            dataPing: [],
            dataHttp: [],
            dataMySql: [],
            dataMongoDB: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        socket.on("update_Ping_data", async data => {
            var ret = await { dataPing: data }
            console.log(JSON.stringify(ret));
            this.setState(ret);
            console.log(JSON.stringify(this.state.dataPing));
        });
        //Maybe adicionar update requeste para 1 client
        socket.on("update_Http_data", async data => {
            var ret = await { dataHttp: data }
            console.log(JSON.stringify(ret));
            this.setState(ret);
            console.log(JSON.stringify(this.state.dataHttp));
        });
        socket.on("update_Mongodb_data", async data => {
            var ret = await { dataMySql: data }
            console.log(JSON.stringify(ret));
            this.setState(ret);
            console.log(JSON.stringify(this.state.dataMySql));
        });
        socket.on("update_Mysql_data", async data => {
            var ret = await { dataMongoDB: data }
            console.log(JSON.stringify(ret));
            this.setState(ret);
            console.log(JSON.stringify(this.state.dataMongoDB));
        });
        socket.emit("request_data_from_server");
    }

    render() {
        var i = 0;
        return (
            <div>
                <div className="container">
                    <h2>Dynamic Tabs</h2>
                    <p>To make the tabs toggleable, add the data-toggle="tab" attribute to each link. Then add a .tab-pane class with a unique ID for every tab and wrap them inside a div element with class .tab-content.</p>

                    <ul className="nav nav-tabs">
                        <li className="active"><a data-toggle="tab" href="#ping">Ping</a></li>
                        <li><a data-toggle="tab" href="#http">Http</a></li>
                        <li><a data-toggle="tab" href="#mongodb">MongoDB</a></li>
                        <li><a data-toggle="tab" href="#mysql">MySql</a></li>
                    </ul>

                    <div className="tab-content">
                        <div id="ping" className="tab-pane fade in active">
                            <h3>HOME</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div id="http" className="tab-pane fade">
                            <h3>Menu 1</h3>
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                        <div id="mongodb" className="tab-pane fade">
                            <h3>Menu 2</h3>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                        </div>
                        <div id="mysql" className="tab-pane fade">
                            <h3>Menu 3</h3>
                            <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div>
                        Pings
                </div>
                    <div className="row">
                        {this.state.dataPing.map(m => {
                            var ret = [m];
                            i++;
                            return (
                                <div className="col-sm-6 col-md-3 col-lg-4 col-xs-12" key={i}>
                                    <div className="card">
                                        <div className="card-header">{m.key}</div>
                                        <div className="card-body">
                                            <NVD3Chart key={i} type="lineChart" datum={ret} x="Data" y="Latencia"
                                                xAxis={{ tickFormat: function (d) { return d3.time.format('%H:%M:%S')(new Date(d)) } }}
                                                yAxis={{ tickFormat: function (d) { return d3.format('')(d) + ' ms' } }}
                                                useInteractiveGuideline={true}
                                                renderStart={function () {
                                                    d3.selectAll(".nvtooltip").remove();
                                                    // d3.selectAll(".hover").remove();
                                                }}

                                            //  containerStyle={{ width: "320px" }} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        Http
                </div>
                    <div className="row">
                        {this.state.dataHttp.map(m => {
                            var ret = [m];
                            i++;
                            return (
                                <div className="col-sm-6 col-md-3 col-lg-4 col-xs-12" key={i}>
                                    <div className="card">
                                        <div className="card-header">{m.key}</div>
                                        <div className="card-body">
                                            <NVD3Chart key={i} type="lineChart" datum={ret} x="Data" y="Latencia"
                                                xAxis={{ tickFormat: function (d) { return d3.time.format('%H:%M:%S')(new Date(d)) } }}
                                                yAxis={{ tickFormat: function (d) { return d3.format('')(d) + ' ms' } }}
                                                useInteractiveGuideline={true}
                                                renderStart={function () {
                                                    d3.selectAll(".nvtooltip").remove();
                                                    // d3.selectAll(".hover").remove();
                                                }}
                                            // containerStyle={{ width: "100%"}} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        MongoDB
                </div>
                    <div className="row">
                        {this.state.dataMongoDB.map(m => {
                            var ret = [m];
                            i++;
                            return (
                                <div className="col-sm-6 col-md-3 col-lg-4 col-xs-12" key={i}>
                                    <div className="card">
                                        <div className="card-header">{m.key}</div>
                                        <div className="card-body">
                                            <NVD3Chart key={i} type="lineChart" datum={ret} x="Data" y="Latencia"
                                                xAxis={{ tickFormat: function (d) { return d3.time.format('%H:%M:%S')(new Date(d)) } }}
                                                yAxis={{ tickFormat: function (d) { return d3.format('')(d) + ' ms' } }}
                                                useInteractiveGuideline={true}
                                                renderStart={function () {
                                                    d3.selectAll(".nvtooltip").remove();
                                                    // d3.selectAll(".hover").remove();
                                                }}
                                            // containerStyle={{ width: "100%"}} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        MySql
                </div>
                    <div className="row">
                        {this.state.dataMySql.map(m => {
                            var ret = [m];
                            i++;
                            return (
                                <div className="col-sm-6 col-md-3 col-lg-4 col-xs-12" key={i}>
                                    <div className="card">
                                        <div className="card-header">{m.key}</div>
                                        <div className="card-body">
                                            <NVD3Chart key={i} type="lineChart" datum={ret} x="Data" y="Latencia"
                                                xAxis={{ tickFormat: function (d) { return d3.time.format('%H:%M:%S')(new Date(d)) } }}
                                                yAxis={{ tickFormat: function (d) { return d3.format('')(d) + ' ms' } }}
                                                useInteractiveGuideline={true}
                                                renderStart={function () {
                                                    d3.selectAll(".nvtooltip").remove();
                                                    // d3.selectAll(".hover").remove();
                                                }}
                                            // containerStyle={{ width: "100%"}} 
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
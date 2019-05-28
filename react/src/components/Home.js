import React from "react";
import NVD3Chart from 'react-nvd3';
import * as d3 from 'd3';
import openSocket from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import "./../index.css"

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
            <ul className="nav nav-tabs">
    <li className="nav-item">
        <a href="/home" class="nav-link active">Home</a>
    </li>
    <li className="nav-item">
        <a href="/api" class="nav-link">Profile</a>
    </li>
    <li className="nav-item">
        <a href="/home" class="nav-link">Messages</a>
    </li>
</ul>
            <div>
                    Pings
                </div>
                <div className="row">
                    {this.state.dataPing.map(m => {
                        var ret = [m];
                        i++;
                        return (
                            <div className="col-sm-12 col-md-6 col-lg-6 col-xs-12 divpadding" key={i}>
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
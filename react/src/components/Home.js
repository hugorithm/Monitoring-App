import React from "react";
import NVD3Chart from 'react-nvd3';
import * as d3 from 'd3';
import openSocket from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';

const socket = openSocket("http://localhost:3000");

export class Home extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        socket.on("update_ping_data", async data => {
            var ret = await { data: data }
            console.log(JSON.stringify(ret));
            this.setState(ret);
            console.log(JSON.stringify(this.state.data));
        });
        //Maybe adicionar update requeste para 1 client
        socket.emit("request_data_from_server");
    }

    render() {
        var i = 0;
        return (
            <div>
            <div className="container">
                <div className="row">

                    {this.state.data.map(m => {
                        var ret = [m];
                        i++;
                        return (
                            <div className="col-sm-6 col-md-3 col-lg-4 col-xs-12" key={i}>
                                <div className="card">
                                    <div className="card-header">{m.key}</div>
                                    <div className="card-body">
                                        <NVD3Chart key={i} type="lineChart" datum={ret} x="Data" y="Latencia"
                                            xAxis={{ tickFormat: function (d) { return d3.time.format('%d %b %H:%M:%S')(new Date(d)) } }}
                                            yAxis={{ tickFormat: function (d) { return d3.format('')(d) + ' ms' } }}
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
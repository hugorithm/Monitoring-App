import React from "react";
import NVD3Chart from 'react-nvd3';
import * as d3 from 'd3';
import openSocket from "socket.io-client";
import { Tabs, Tab, Card, Row, Col, Container } from 'react-bootstrap';
import './../index.css';

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
            <div className="divmargin">
            <Tabs defaultActiveKey="ping" id="tabs">
                <Tab eventKey="ping" title="Ping">
                <div className='rowmargin'>
                        <Row>
                            {this.state.dataPing.map(m => {
                                var ret = [m];
                                i++;
                                return (
                                    <Col xs={6} md={3}>

                                        <Card>
                                            <Card.Header>{m.key}</Card.Header>
                                            <Card.Body>
                                                <NVD3Chart key={i} type="lineChart" datum={ret} x="Data" y="Latencia"
                                                    xAxis={{ tickFormat: function (d) { return d3.time.format('%M:%S')(new Date(d)) } }}
                                                    yAxis={{ tickFormat: function (d) { return d3.format('')(d) + ' ms' } }}
                                                    useInteractiveGuideline={true}
                                                    renderStart={function () {
                                                        d3.selectAll(".nvtooltip").remove();
                                                        // d3.selectAll(".hover").remove();
                                                    }}

                                                //  containerStyle={{ width: "320px" }} 
                                                />

                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                        </div>
                </Tab>
                <Tab eventKey="http" title="Http">
                        <div className='rowmargin'>
                        <Row>
                            {this.state.dataHttp.map(m => {
                                var ret = [m];
                                i++;
                                return (
                                    <Col xs={6} md={3}>

                                        <Card>
                                            <Card.Header>{m.key}</Card.Header>
                                            <Card.Body>
                                                <NVD3Chart key={i} type="lineChart" datum={ret} x="Data" y="Latencia"
                                                    xAxis={{ tickFormat: function (d) { return d3.time.format('%M:%S')(new Date(d)) } }}
                                                    yAxis={{ tickFormat: function (d) { return d3.format('')(d) + ' ms' } }}
                                                    useInteractiveGuideline={true}
                                                    renderStart={function () {
                                                        d3.selectAll(".nvtooltip").remove();
                                                        // d3.selectAll(".hover").remove();
                                                    }}

                                                //  containerStyle={{ width: "320px" }} 
                                                />

                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
</div>
                </Tab>
                <Tab eventKey="mongo" title="MongoDB" >               
                <div className='rowmargin'> 
                        <Row>
                            {this.state.dataMongoDB.map(m => {
                                var ret = [m];
                                i++;
                                return (
                                    <Col xs={6} md={3}>

                                        <Card>
                                            <Card.Header>{m.key}</Card.Header>
                                            <Card.Body>
                                                <NVD3Chart key={i} type="lineChart" datum={ret} x="Data" y="Latencia"
                                                    xAxis={{ tickFormat: function (d) { return d3.time.format('%M:%S')(new Date(d)) } }}
                                                    yAxis={{ tickFormat: function (d) { return d3.format('')(d) + ' ms' } }}
                                                    useInteractiveGuideline={true}
                                                    renderStart={function () {
                                                        d3.selectAll(".nvtooltip").remove();
                                                        // d3.selectAll(".hover").remove();
                                                    }}

                                                //  containerStyle={{ width: "320px" }} 
                                                />

                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                        </div>
                </Tab>
                <Tab eventKey="mysql" title="MySql" >
                <div className='rowmargin'>
                        <Row>
                            {this.state.dataMySql.map(m => {
                                var ret = [m];
                                i++;
                                return (
                                    <Col xs={6} md={3}>

                                        <Card>
                                            <Card.Header>{m.key}</Card.Header>
                                            <Card.Body>
                                                <NVD3Chart key={i} type="lineChart" datum={ret} x="Data" y="Latencia"
                                                    xAxis={{ tickFormat: function (d) { return d3.time.format('%M:%S')(new Date(d)) } }}
                                                    yAxis={{ tickFormat: function (d) { return d3.format('')(d) + ' ms' } }}
                                                    useInteractiveGuideline={true}
                                                    renderStart={function () {
                                                        d3.selectAll(".nvtooltip").remove();
                                                        // d3.selectAll(".hover").remove();
                                                    }}

                                                //  containerStyle={{ width: "320px" }} 
                                                />

                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                        </div>
                </Tab>
            </Tabs>

</div>





        );
    }
}
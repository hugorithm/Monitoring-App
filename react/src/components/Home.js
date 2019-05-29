import React from "react";
import NVD3Chart from 'react-nvd3';
import * as d3 from 'd3';
import openSocket from "socket.io-client";
import { Tabs, Tab, Card, Row, Col, Container, Badge, Alert } from 'react-bootstrap';
import "./../index.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck  } from '@fortawesome/free-solid-svg-icons'
library.add(faCheck);



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
                <Container>
                    <Alert variant="success">
                    <FontAwesomeIcon icon="check"/> <strong>Aviso: </strong>Todos os serviços estão operacionais!
                    </Alert>
                </Container>
                <Tabs defaultActiveKey="ping" id="tabs" style={{ marginLeft: 5, marginRight: 5 }}>
                    <Tab eventKey="ping" title="Ping">
                        <Row style={{ marginLeft: 0.5, marginRight: 0.5, marginTop: 2.5, marginBottom: 2.5 }}>
                            {this.state.dataPing.map(m => {
                                var ret = [m];
                                i++;
                                return (
                                    <Col xs={6} md={3} style={{ marginTop: 2.5, marginBottom: 2.5, paddingLeft: 5, paddingRight: 5 }}>
                                        <Card >
                                            <Card.Header>{m.key} <Badge variant="info">Ping</Badge> </Card.Header>
                                            <Card.Body>
                                                <NVD3Chart key={i} type="lineChart" datum={ret} x="Data" y="Latencia"
                                                    xAxis={{ tickFormat: function (d) { return d3.time.format('%M:%S')(new Date(d)) } }}
                                                    yAxis={{ tickFormat: function (d) { return d3.format('')(d) + ' ms' } }}
                                                    useInteractiveGuideline={true}
                                                    renderStart={function () {
                                                        d3.selectAll(".nvtooltip").remove();
                                                        // d3.selectAll(".hover").remove();
                                                    }}
                                                />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Tab>
                    <Tab eventKey="http" title="Http">
                        <Row style={{ marginLeft: 0.5, marginRight: 0.5, marginTop: 2.5, marginBottom: 2.5 }}>
                            {this.state.dataHttp.map(m => {
                                var ret = [m];
                                i++;
                                return (
                                    <Col xs={6} md={3} style={{ marginTop: 2.5, marginBottom: 2.5, paddingLeft: 5, paddingRight: 5 }}>
                                        <Card>
                                            <Card.Header>{m.key} <Badge variant="info">Http</Badge></Card.Header>
                                            <Card.Body>
                                                <NVD3Chart key={i} type="lineChart" datum={ret} x="Data" y="Latencia"
                                                    xAxis={{ tickFormat: function (d) { return d3.time.format('%M:%S')(new Date(d)) } }}
                                                    yAxis={{ tickFormat: function (d) { return d3.format('')(d) + ' ms' } }}
                                                    useInteractiveGuideline={true}
                                                    renderStart={function () {
                                                        d3.selectAll(".nvtooltip").remove();
                                                        // d3.selectAll(".hover").remove();
                                                    }}
                                                />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Tab>
                    <Tab eventKey="mongo" title="MongoDB" >
                        <Row style={{ marginLeft: 0.5, marginRight: 0.5, marginTop: 2.5, marginBottom: 2.5 }}>
                            {this.state.dataMongoDB.map(m => {
                                var ret = [m];
                                i++;
                                return (
                                    <Col xs={6} md={3} style={{ marginTop: 2.5, marginBottom: 2.5, paddingLeft: 5, paddingRight: 5 }}>

                                        <Card>
                                            <Card.Header>{m.key} <Badge variant="info">MongoDB</Badge></Card.Header>
                                            <Card.Body>
                                                <NVD3Chart key={i} type="lineChart" datum={ret} x="Data" y="Latencia"
                                                    xAxis={{ tickFormat: function (d) { return d3.time.format('%M:%S')(new Date(d)) } }}
                                                    yAxis={{ tickFormat: function (d) { return d3.format('')(d) + ' ms' } }}
                                                    useInteractiveGuideline={true}
                                                    renderStart={function () {
                                                        d3.selectAll(".nvtooltip").remove();
                                                        // d3.selectAll(".hover").remove();
                                                    }}
                                                />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Tab>
                    <Tab eventKey="mysql" title="MySql" >

                        <Row style={{ marginLeft: 0.5, marginRight: 0.5, marginTop: 2.5, marginBottom: 2.5 }}>
                            {this.state.dataMySql.map(m => {
                                var ret = [m];
                                i++;
                                return (
                                    <Col xs={6} md={3} style={{ marginTop: 2.5, marginBottom: 2.5, paddingLeft: 5, paddingRight: 5 }}>

                                        <Card>
                                            <Card.Header>{m.key} <Badge variant="info">MySql</Badge></Card.Header>
                                            <Card.Body>
                                                <NVD3Chart key={i} type="lineChart" datum={ret} x="Data" y="Latencia"
                                                    xAxis={{ tickFormat: function (d) { return d3.time.format('%M:%S')(new Date(d)) } }}
                                                    yAxis={{ tickFormat: function (d) { return d3.format('')(d) + ' ms' } }}
                                                    useInteractiveGuideline={true}
                                                    renderStart={function () {
                                                        d3.selectAll(".nvtooltip").remove();
                                                        // d3.selectAll(".hover").remove();
                                                    }}
                                                />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>

                    </Tab>
                </Tabs>
            </div>





        );
    }
}
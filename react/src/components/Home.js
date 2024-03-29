import React from "react";
import NVD3Chart from 'react-nvd3';
import * as d3 from 'd3';
import openSocket from "socket.io-client";
import { Tabs, Tab, Card, Row, Col, Container, Badge, Alert } from 'react-bootstrap';
import "./../index.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
library.add(faCheck, faExclamationTriangle);



const socket = openSocket("http://localhost:3000");

export class Home extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            dataPing: [],
            dataHttp: [],
            dataMySql: [],
            dataMongoDB: [],
            dataAlerta: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        socket.on("update_Ping_data", async data => {
            var ret = await { dataPing: data }
            this.setState(ret);
        });
        //Maybe adicionar update requeste para 1 client
        socket.on("update_Http_data", async data => {
            var ret = await { dataHttp: data }
            this.setState(ret);
        });
        socket.on("update_Mongodb_data", async data => {
            var ret = await { dataMongoDB: data }
            this.setState(ret);
        });
        socket.on("update_Mysql_data", async data => {
            var ret = await { dataMySql: data }
            this.setState(ret);
        });
        socket.on("update_Alerta_data", async data => {
            var ret = await { dataAlerta: data }
            this.setState(ret);
        });
        socket.emit("request_data_from_server");
    }

    render() {
        var i = 0;
        return (
            <div>
                <Container>
                    {this.state.dataAlerta.map(m => {
                            return (
                                <Alert variant="danger">
                                <FontAwesomeIcon icon="exclamation-triangle"/> {m.data_inicio} {m.nome} <Badge variant="danger">{m.tipo}</Badge>: {m.mensagem_alerta}
                                </Alert>
                            )       
                    })                     
                    }                   
                </Container>
                <Tabs defaultActiveKey="ping" id="tabs" style={{ marginLeft: 5, marginRight: 5 }}>
                    <Tab eventKey="ping" title="Ping">
                        <Row style={{ marginLeft: 1, marginRight: 1, marginTop: 5, marginBottom: 5 }}>
                            {this.state.dataPing.map(m => {
                                var ret = [m];
                                i++;
                                return (
                                    <Col xs={6} md={3} style={{ marginTop: 5, marginBottom: 5, paddingLeft: 10, paddingRight: 10 }}>
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
                        <Row style={{ marginLeft: 1, marginRight: 1, marginTop: 5, marginBottom: 5 }}>
                            {this.state.dataHttp.map(m => {
                                var ret = [m];
                                i++;
                                return (
                                    <Col xs={6} md={3} style={{ marginTop: 5, marginBottom: 5, paddingLeft: 10, paddingRight: 10 }}>
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
                        <Row style={{ marginLeft: 1, marginRight: 1, marginTop: 5, marginBottom: 5 }}>
                            {this.state.dataMongoDB.map(m => {
                                var ret = [m];
                                i++;
                                return (
                                    <Col xs={6} md={3} style={{ marginTop: 5, marginBottom: 5, paddingLeft: 10, paddingRight: 10 }}>

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
                        <Row style={{ marginLeft: 1, marginRight: 1, marginTop: 5, marginBottom: 5 }}>
                            {this.state.dataMySql.map(m => {
                                var ret = [m];
                                i++;
                                return (
                                    <Col xs={6} md={3} style={{ marginTop: 5, marginBottom: 5, paddingLeft: 10, paddingRight: 10 }}>

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
import React from "react";
import openSocket from "socket.io-client";
import { Button, Form, Container, Col, Row } from 'react-bootstrap';

const socket = openSocket("http://localhost:3000");

export class Ping extends React.Component {

    state = {
        nome: "",
        endereco: "",
        tipo: "Máquina",
        ping: false,
        http: false,
        classe: "",
        propriedade: "",
        tempo_verificacao: "",
        valor_minimo: "",
        valor_maximo: "",
        duracao_erro: "",
        percentagem_erro: "",
        estado: "Visível",
        mensagem_alerta: "",
        cod_funcional: "",
        checed: {}

    };

    change = e => {
        console.log(e.target.name, e.target.value, e.target.checked);
        if (e.target.name == "ping" || e.target.name == "http") {
            this.setState({
                [e.target.name]: e.target.checked
            });
        } else {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    };

    onSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        var obj = new Object();
        obj.nome = this.state.nome;
        obj.endereco = this.state.endereco;
        obj.tipo = this.state.tipo;
        obj.classe = this.state.classe;
        obj.propriedade = this.state.propriedade;
        obj.tempo_verificacao = this.state.tempo_verificacao;
        var tipo_ver = [];
        if(this.state.ping == true){
            tipo_ver.push("Ping");
        }
        if(this.state.http == true){
            tipo_ver.push("Http");
        }
        obj.tipo_verificacao = tipo_ver;
        obj.valor_minimo = this.state.valor_minimo;
        obj.valor_maximo = this.state.valor_maximo;
        obj.duracao_erro = this.state.duracao_erro;
        obj.percentagem_erro = this.state.percentagem_erro;
        obj.estado = this.state.estado;
        obj.cod_funcional = this.state.cod_funcional;
        obj.mensagem_alerta = this.state.mensagem_alerta;
        socket.emit("send_form_data", obj);
        window.alert("Api adicionada com sucesso!");
        window.location.replace("/home");
    };


    render() {
        const tipo = this.state.tipo;
        const disabled = tipo == 'Máquina';
        const http = this.state.http
        const checkboxDisabled = http == false; 
        return (
            <Container>
                <Form onSubmit={e => this.onSubmit(e)}>
                    <Row>
                        <Col sm>
                            <Form.Group controlId="nome">
                                <Form.Label>Nome:</Form.Label>
                                <Form.Control type="text" placeholder="Nome da Api" name="nome" required
                                    onChange={e => this.change(e)} />
                            </Form.Group>
                            <Form.Group controlId="endereco">
                                <Form.Label>Endereço:</Form.Label>
                                <Form.Control type="text" placeholder="Ex.( www.foo-bar.com )" name="endereco" required
                                    onChange={e => this.change(e)} />
                            </Form.Group>
                            <Form.Group controlId="tipo">
                                <Form.Label>Tipo:</Form.Label>
                                <Form.Control as="select" name="tipo" required
                                    onChange={e => this.change(e)}>
                                    <option>Máquina</option>
                                    <option>Website</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Label>Tipo de Verificação:</Form.Label>
                            <Form.Group controlId="tipo_verificacao" name="tipo_verificacao" >
                                <Form.Check inline disabled={disabled} type="checkbox" name="http" label="Http" onChange={e => this.change(e)} />
                                <Form.Check inline type="checkbox" name="ping" label="Ping" onChange={e => this.change(e)} />
                            </Form.Group>
                            <Form.Group controlId="classe">
                                <Form.Label>Classe:</Form.Label>
                                <Form.Control type="text" placeholder="Classe" name="classe" required
                                    onChange={e => this.change(e)} />
                            </Form.Group>
                            <Form.Group controlId="propriedade">
                                <Form.Label>Propriedade:</Form.Label>
                                <Form.Control type="text" placeholder="Propriedade" name="propriedade" required
                                    onChange={e => this.change(e)} />
                            </Form.Group>
                            <Form.Group controlId="estado">
                                <Form.Label>Estado:</Form.Label>
                                <Form.Control as="select" name="estado" required
                                    onChange={e => this.change(e)}>
                                    <option>Visível</option>
                                    <option>Escondido</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>


                        <Col sm>
                            <Form.Group controlId="tempo_verificacao">
                                <Form.Label>Tempo de Verificação:</Form.Label>
                                <Form.Control type="number" placeholder="Tempo de Verificação (em segundos)" name="tempo_verificacao" required
                                    onChange={e => this.change(e)} />
                            </Form.Group>
                            <Form.Group controlId="valor_minimo">
                                <Form.Label>Valor Minimo:</Form.Label>
                                <Form.Control type="number" placeholder="Valor Minimo (em milisegundos)" name="valor_minimo" required
                                    onChange={e => this.change(e)} />
                            </Form.Group>
                            <Form.Group controlId="valor_maximo">
                                <Form.Label>Valor Máximo:</Form.Label>
                                <Form.Control type="number" placeholder="Valor Máximo (em milisegundos)" name="valor_maximo" required
                                    onChange={e => this.change(e)} />
                            </Form.Group>
                            <Form.Group controlId="duracao_erro">
                                <Form.Label>Duração do Erro:</Form.Label>
                                <Form.Control type="number" placeholder="Duração do Erro (em segundos)" name="duracao_erro" required
                                    onChange={e => this.change(e)} />
                            </Form.Group>
                            <Form.Group controlId="percentagem_erro">
                                <Form.Label>Percentagem do Erro:</Form.Label>
                                <Form.Control type="text" placeholder="Percentagem do Erro" name="percentagem_erro" required
                                    onChange={e => this.change(e)} />
                            </Form.Group>
                            <Form.Group controlId="mensagem_alerta">
                                <Form.Label>Mensagem do Alerta:</Form.Label>
                                <Form.Control type="text" placeholder="Mensagem do Alerta" name="mensagem_alerta" required
                                    onChange={e => this.change(e)} />
                            </Form.Group>
                            <Form.Group controlId="cod_funcional">
                                <Form.Label>Código Funcional:</Form.Label>
                                <Form.Control type="text" placeholder="Código Funcional" disabled={checkboxDisabled} name="cod_funcional"
                                    onChange={e => this.change(e)} />
                            </Form.Group>                        
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                        Registar
                </Button>
                    <span> </span>
                    <Button variant="light" type="button" href="/home">Cancelar</Button>
                </Form >
            </Container>
        );
    }
}
import React from "react";
import openSocket from "socket.io-client";
import { Button, Form, Container, Col, Row } from 'react-bootstrap';

const socket = openSocket("http://localhost:3000");

export class Mongo extends React.Component {

    state = {
        nome: "",
        endereco: "",
        tipo: "Base de Dados",
        tipo_verificacao: ["Mongo"],
        classe: "",
        propriedade: "",
        tempo_verificacao: "",
        valor_minimo: "",
        valor_maximo: "",
        duracao_erro: "",
        percentagem_erro: "",
        estado: "Visível",
        query: "",
        collection_name: "",
        database: ""    
    
    };

    change = e => {
        // this.props.onChange({ [e.target.name]: e.target.value });
        this.setState({
            [e.target.name]: e.target.value
        });
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
        obj.tipo_verificacao = this.state.tipo_verificacao;
        obj.valor_minimo = this.state.valor_minimo;
        obj.valor_maximo = this.state.valor_maximo;
        obj.duracao_erro = this.state.duracao_erro;
        obj.percentagem_erro = this.state.percentagem_erro;
        obj.collection_name = this.state.collection_name;
        obj.estado = this.state.estado;
        obj.query = this.state.query;
        obj.database = this.state.database;       
        socket.emit("send_form_data", obj);
        window.alert("Api adicionada com sucesso!");
        window.location.replace("/home");
    };


    render() {
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
                            <Form.Control type="text" placeholder="Ex.( mongodb://localhost:27017 )" name="endereco" required
                                onChange={e => this.change(e)} />
                        </Form.Group>
                        <Form.Group controlId="database">
                            <Form.Label>Database:</Form.Label>
                            <Form.Control type="text" placeholder="Database" name="database" required
                                onChange={e => this.change(e)} />
                        </Form.Group>
                        <Form.Group controlId="collection_name">
                            <Form.Label>Collection:</Form.Label>
                            <Form.Control type="text" placeholder="Collection" name="collection_name" required
                                onChange={e => this.change(e)} />
                        </Form.Group>
                        <Form.Group controlId="query">
                            <Form.Label>Query:</Form.Label>
                            <Form.Control type="text" placeholder="Query" name="query" required
                                onChange={e => this.change(e)} />
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
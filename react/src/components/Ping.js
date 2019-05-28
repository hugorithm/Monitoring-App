import React from "react";
import openSocket from "socket.io-client";
import { Button, Form, FormControl } from 'react-bootstrap';

const socket = openSocket("http://localhost:3000");

export class Ping extends React.Component {

    state = {
        nome: "",
        endereco: "",
        tipo: "Máquina",
        //tipo_verificacao: [],
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
        cod_funcional: [],
        cod_nao_funcional: []

    };

    change = e => {
        // this.props.onChange({ [e.target.name]: e.target.value });
        console.log(e.target.name, e.target.value, e.target.checked);
        if(e.target.name == "ping" || e.target.name == "http"){
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
        var nome = this.state.nome;
        var endereco = this.state.endereco;
        var tipo = this.state.tipo;
        var classe = this.state.classe;
        var propriedade = this.state.propriedade;
        var tempo_verificacao = this.state.tempo_verificacao;
        var tipo_verificacao = [this.state.ping, this.state.http];
        var valor_minimo = this.state.valor_minimo;
        var valor_maximo = this.state.valor_maximo;
        var duracao_erro = this.state.duracao_erro;
        var percentagem_erro = this.state.percentagem_erro;
        var estado = this.state.estado;
        var cod_funcional = this.state.cod_funcional;
        var cod_nao_funcional = this.state.cod_nao_funcional;
        console.log(tipo_verificacao);
        socket.emit("send_form_data", nome, endereco, tipo, classe, propriedade, tempo_verificacao, tipo_verificacao, valor_minimo, valor_maximo, duracao_erro, percentagem_erro, estado, cod_funcional, cod_nao_funcional);
        window.alert("Api adicionada com sucesso!");
        window.location.replace("/home");
        // this.props.onSubmit(this.state);
        // this.setState({
        //     nome: "",
        //     endereco: "",
        //     tipo: "",
        //     classe: "",
        //     propriedade: "",
        //     tempo: ""
        // });
        // this.props.onChange({
        //     nome: "",
        //     endereco: "",
        //     tipo: "",
        //     classe: "",
        //     propriedade: "",
        //     tempo: ""
        // });
    };


    render() {
        return (
            <Form onSubmit={e => this.onSubmit(e)}>
                <Form.Group controlId="nome">
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control type="text" placeholder="Nome da Api" name="nome" required
                        onChange={e => this.change(e)} />
                </Form.Group>
                <Form.Group controlId="endereco">
                    <Form.Label>Endereço:</Form.Label>
                    <Form.Control type="text" placeholder="Endereço" name="endereco" required
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
                <Form.Group controlId="tipo_verificacao" name="tipo_verificacao" >
                    <Form.Check type="checkbox" name="http" label="Http" onChange={e => this.change(e)} />
                    <Form.Check type="checkbox" name="ping" label="Ping" onChange={e => this.change(e)} />
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
                <Form.Group controlId="estado">
                    <Form.Label>Estado:</Form.Label>
                    <Form.Control as="select" name="estado" required
                        onChange={e => this.change(e)}>
                        <option>Visível</option>
                        <option>Escondido</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="cod_funcional">
                    <Form.Label>Código Funcional:</Form.Label>
                    <Form.Control type="text" placeholder="Código Funcional" name="cod_funcional"
                        onChange={e => this.change(e)} />
                </Form.Group>
                <Form.Group controlId="cod_nao_funcional">
                    <Form.Label>Código Não Funcional:</Form.Label>
                    <Form.Control type="text" placeholder="Código Não Funcional" name="cod_nao_funcional"
                        onChange={e => this.change(e)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Registar
                </Button>
            </Form >         
        );
    }
}
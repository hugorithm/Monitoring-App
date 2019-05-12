import React from "react";
import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:3000");

export class Api extends React.Component {

    state = {
        nome: "",
        endereco: "",
        tipo: "",
        classe: "",
        propriedade: "",
        tempo: ""
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
        var nome = this.state.nome;
        var endereco = this.state.endereco;
        var tipo = this.state.tipo;
        var classe = this.state.classe;
        var propriedade = this.state.propriedade;
        var tempo = this.state.tempo;
        socket.emit("send_form_data", nome, endereco, tipo, classe, propriedade, tempo);
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
            <form onSubmit="">
                <div className="form-group">
                    <label>Nome:</label>
                    <input name="nome" type="text" className="form-control" placeholder="Nome" required
                        value={this.state.nome}
                        onChange={e => this.change(e)} />
                </div>
                <div className="form-group">
                    <label>Endereço:</label>
                    <input name="endereco" type="text" className="form-control" placeholder="Endereço"
                        value={this.state.endereco}
                        onChange={e => this.change(e)} />
                </div>
                <div className="form-group">
                    <label>Tipo:</label>
                    <input name="tipo" type="text" className="form-control" placeholder="Tipo"
                        value={this.state.tipo}
                        onChange={e => this.change(e)} />
                </div>
                <div className="form-group">
                    <label>Classe:</label>
                    <input name="classe" type="text" className="form-control" placeholder="Classe"
                        value={this.state.classe}
                        onChange={e => this.change(e)} />
                </div>
                <div className="form-group">
                    <label>Propiedade:</label>
                    <input name="propriedade" type="text" className="form-control" placeholder="Propriedade"
                        value={this.state.propriedade}
                        onChange={e => this.change(e)} />
                </div>
                <div className="form-group">
                    <label>Tempo de Verificação:</label>
                    <input name="tempo" type="text" className="form-control" placeholder="Tempo de Verificação (em segundos)"
                        value={this.state.tempo}
                        onChange={e => this.change(e)} />
                </div>
                <button type="submit" className="btn btn-primary"
                    onClick={e => this.onSubmit(e)}>Submit</button>
            </form>
        );
    }
}
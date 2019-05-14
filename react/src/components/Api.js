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
        tempo: "",
        username: "",
        password: "",
        dbName: "",
        collection: "",
        query: ""
    };


    change = e => {    
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        var nome = this.state.nome;
        var endereco = this.state.endereco;
        var tipo = document.getElementById("tipoapi").value;
        var classe = this.state.classe;
        var propriedade = this.state.propriedade;
        var tempo = this.state.tempo;
        //console.log(tipo)
        // socket.emit("send_form_data", nome, endereco, tipo, classe, propriedade, tempo);
        // window.location.replace("/home");
       
    };

    updatePage(e){
       if(e.target.value === "Mongo"){
        render (){
            return (
                
            );
        }

       }
    }


    render() {
        return (
            <form id="addapi" onSubmit="">
                <div className="form-group">
                    <label>Nome:</label>
                    <input name="nome" type="text" className="form-control" placeholder="Nome" required
                        value={this.state.nome}
                        onChange={e => this.change(e)} />
                </div>
                <div className="form-group">
                    <label>Endereço:</label>
                    <input name="endereco" type="text" className="form-control" placeholder="Endereço" required
                        value={this.state.endereco}
                        onChange={e => this.change(e)} />
                </div>
                <div className="form-group">
                    <label>Tipo:</label>
                    <select name="tipo" id="tipoapi"className="form-control" onChange={e => this.updatePage(e)}>
                        <option value="Ping">Ping</option>
                        <option value="Http">Http: GET</option>
                        <option value="Mongo">MongoDB</option>
                        <option value="Mysql">MySql</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Classe:</label>
                    <input name="classe" type="text" className="form-control" placeholder="Classe" required
                        value={this.state.classe}
                        onChange={e => this.change(e)} />
                </div>
                <div className="form-group">
                    <label>Propriedade:</label>
                    <input name="propriedade" type="text" className="form-control" placeholder="Propriedade" required
                        value={this.state.propriedade}
                        onChange={e => this.change(e)} />
                </div>
                <div className="form-group">
                    <label>Tempo de Verificação:</label>
                    <input name="tempo" type="number" className="form-control" placeholder="Tempo de Verificação (em segundos)" required
                        value={this.state.tempo}
                        onChange={e => this.change(e)} />
                </div>
                <button type="submit" className="btn btn-primary"
                    onClick={e => this.onSubmit(e)}>Submit</button>
            </form>
        );
    }
}
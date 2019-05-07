import React from "react";


export class Api extends React.Component {
   

    render() {
        return (
            <form onSubmit="">
            <div class="form-group">
                <label>Nome:</label>
                <input type="text" class="form-control" placeholder="Nome" />               
            </div>
            <div class="form-group">
                <label>Endereço:</label>
                <input type="text" class="form-control" placeholder="endereco" />               
            </div>
            <div class="form-group">
                <label>Nome:</label>
                <input type="text" class="form-control" placeholder="Nome" />               
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        );
    }
}
import React from "react";


export class Api extends React.Component {
   

    render() {
        return (
            <form onSubmit="">
            <div className="form-group">
                <label>Nome:</label>
                <input className="form-control" type="text" class="form-control" placeholder="Nome" />               
            </div>
            <div className="form-group">
                <label>Endereço:</label>
                <input className="form-control" type="text" class="form-control" placeholder="endereco" />               
            </div>
            <div className="form-group">
                <label>Nome:</label>
                <input className="form-control" type="text" class="form-control" placeholder="Nome" />               
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        );
    }
}
import React from "react";


export class Api extends React.Component {
   

    render() {
        return (
            <form onSubmit="">
            <div className="form-group">
                <label>Nome:</label>
                <input type="text" className="form-control" placeholder="Nome" />               
            </div>
            <div className="form-group">
                <label>Endereço:</label>
                <input type="text" className="form-control" placeholder="endereco" />               
            </div>
            <div className="form-group">
                <label>Nome:</label>
                <input type="text" className="form-control" placeholder="Nome" />               
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        );
    }
}
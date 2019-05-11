import React from "react";


export class Api extends React.Component {


    render() {
        return (
            <div className="row">
                <div className="col-md-2 col-md-offset-5">
                    <form onSubmit="">
                        <div className="form-group">
                            <label>Nome:</label>
                            <input type="text" className="form-control" placeholder="Nome" />
                        </div>
                        <div className="form-group">
                            <label>Endereço:</label>
                            <input type="text" className="form-control" placeholder="Endereço" />
                        </div>
                        <div className="form-group">
                            <label>Tempo de Ciclo:</label>
                            <input type="text" className="form-control" placeholder="Tempo de Ciclo" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
import React from "react";


export class User extends React.Component {

   
    render() {
        return (
            <div>
                <h3>The User Page</h3>
                <p>User ID: {this.props.params.id}</p>
                <button className="btn btn-primary">Go Home!</button>
            </div>
        );
    }
}
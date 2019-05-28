import React from "react";

import { Header } from "./Header";


export class Root extends React.Component {
    render() {
        return (
            <div>   
                <div className="header">
                    <Header />
                </div>
                <br></br>
                <div className="body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
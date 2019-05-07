import React from "react";

import {Header} from "./Header";
import 'bootstrap/dist/css/bootstrap.min.css';

export class Root extends React.Component {
    render() {
        return (
            <div>
            <div className="header">
               <Header/>
               </div>
                <div className="body">
                    
                        {this.props.children}

                </div>
                </div>
        );
    }
}
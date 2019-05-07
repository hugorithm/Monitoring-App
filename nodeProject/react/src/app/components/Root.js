import React from 'react';

import {Header} from './Header'

export class Root extends React.Component{
    render(){
        <div className="container">
            <div className="header">

            </div>
            <div className="body">
            {this.props.children}
            </div>
        </div>
    }
}
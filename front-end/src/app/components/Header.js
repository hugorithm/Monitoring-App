import React from "react";
import {Link} from "react-router";

import 'bootstrap/dist/css/bootstrap.min.css';

export const Header = (props) => {
    return (   
          <nav className="navbar navbar-expand-sm bg-light navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">ApiMonitor</a>
            </li>
            <li className="nav-item">
             <a className="nav-link" href="/home">Home</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="/api">Configuração</a>
            </li>
          </ul>
        </nav>
    );
};
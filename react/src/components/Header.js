import React from "react";
import { Link } from "react-router";

import 'bootstrap/dist/css/bootstrap.min.css';

export const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-sm bg-light navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link" href="/home">ApiMonitor</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/home">Home</a>
        </li>
        <li className="nav-item">
        <div class="dropdown">
            <span className="nav-link dropdown" href="/api">Configuração</span>
            <div class="dropdown-content">
            <a className="nav-link dropdown" href="/api">Website</a>
            <a className="nav-link dropdown" href="/api">Máquina</a>
            <a className="nav-link dropdown" href="/api">Base de Dados</a>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );  
};
import React from "react";
import { Link } from "react-router";

import 'bootstrap/dist/css/bootstrap.min.css';

export const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-sm bg-light navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <div class="dropdown">
            <span className="nav-link dropdown" href="/home">ApiMonitor</span>
            <div class="dropdown-content">
            <a className="nav-link dropdown" href="/home">ApiMonitor</a>
            </div>
          </div>
        </li>
        <li className="nav-item">
        <div class="dropdown">
            <span className="nav-link dropdown" href="/home">Home</span>
            <div class="dropdown-content">
            <a className="nav-link dropdown" href="/home">Home</a>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/api">Configuração</a>
        </li>
      </ul>
    </nav>
  );  
};
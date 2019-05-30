import React from "react";
import { Link } from "react-router";
import {Button, Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap';
import logo from "./img/iconfinder_monitor_285642.svg";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCog, faPlus, faList  } from '@fortawesome/free-solid-svg-icons'
library.add(faHome, faCog, faPlus, faList);



const icon = (<span><FontAwesomeIcon icon="cog"/> Configurações</span>);

export const Header = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/home">
      <img
        alt=""
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
      />
      {' ApiMonitor'}
    </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home"><FontAwesomeIcon icon="home"/> Inicio</Nav.Link>
          <NavDropdown title={icon} id="basic-nav-dropdown">
            <NavDropdown.Item href="/config/ping"><FontAwesomeIcon icon="plus"/> Api</NavDropdown.Item>
            <NavDropdown.Item href="/config/mongo"><FontAwesomeIcon icon="plus"/> MongoDB</NavDropdown.Item>
            <NavDropdown.Item href="/config/mysql"><FontAwesomeIcon icon="plus"/> MySql</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/servicos/list"><FontAwesomeIcon icon="list"/> Serviços</NavDropdown.Item>
         
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
   
    );
};
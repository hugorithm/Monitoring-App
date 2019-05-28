import React from "react";
import { Link } from "react-router";
import {Button, Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap';



export const Header = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/home">ApiMonitor</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <NavDropdown title="Configurações" id="basic-nav-dropdown">
            <NavDropdown.Item href="/config/ping">Adicionar Api</NavDropdown.Item>
            {/* <NavDropdown.Item href="/config/http">Adicionar Http</NavDropdown.Item> */}
            <NavDropdown.Item href="/config/mongo">Adicionar MongoDB</NavDropdown.Item>
            <NavDropdown.Item href="/config/mysql">Adicionar MySql</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/edit/ping">Editar Api</NavDropdown.Item>
            <NavDropdown.Item href="/edit/mongo">Editar MongoDB</NavDropdown.Item>
            <NavDropdown.Item href="/edit/mysql">Editar MySql</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
   
    );
};
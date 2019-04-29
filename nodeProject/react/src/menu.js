import React, { Component } from "react";
import logo from "./logo.png";
import searchIcon from "./search-icon.png";
class menu extends Component {
  render() {
    console.log(this.props.links);
    return (
      <nav className="menu">
        <h1
          style={{
            backgroundImage: "url(" + logo + ")"
          }}
          className="menu__logo" href="#home" 
        />
        <div className="menu__left">
          <ul className="menu__list">
            <li className="menu__list-item">
              <a className="menu__link menu__link--active" href="#">
                Home
              </a>
            </li>
            <li className="menu__list-item">
              <a className="menu__link" href="#config">
                Configuração
              </a>
            </li>            
          </ul>

         

          <form className="menu__search-form hide" method="POST">
            <input
              className="menu__search-input"
              placeholderN="Type and hit enter"
            />
          </form>
        </div>
      </nav>
    );
  }
}

export default menu;

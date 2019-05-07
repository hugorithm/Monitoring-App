import React, { Component } from "react";
import searchIcon from "./search-icon.png";
class menu extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false
    };
  }
  showForm() {
    this.setState({
      showForm: !this.state.showForm
    });
  }
  render() {
    let searchForm = this.state.showForm ? (
      <form className="menu__search-form" method="POST">
        <input
          className="menu__search-input"
          placeholder="Type and hit enter"
        />
      </form>
    ) : (
      ""
    );
    let linksMarkup = this.props.links.map((link, index) => {
      let linksMarkup = link.active ? (
        <a className="menu__link--active" href={link.link}>
          {link.label}
        </a>
      ) : (
        <a className="menu__link" href={link.link}>
          {link.label}
        </a>
      );

      return (
        <li key={index} className="menu__list-item">
          {linksMarkup}
        </li>
      );
    });

    return (
      <nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="#">WebSiteName</a>
    </div>
    <ul className="nav navbar-nav">
      <li className="active"><a href="#">Home</a></li>
      <li><a href="#">Page 1</a></li>
      <li><a href="#">Page 2</a></li>
      <li><a href="#">Page 3</a></li>
    </ul>
  </div>
</nav>
  
    );
  }
}

export default menu;

import React, { Fragment } from "react";
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { NavLink as NavLinkBS }  from 'react-bootstrap'; // ezt ki kellett szedeni, mert ez is legenerált egy a-linket, és a kettő ütközött egymással 


export default class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Fragment>
          <NavLink className="nav-link" to={this.props.link}>
            <i className={this.props.icon}></i>
            <span>{this.props.name}</span>
          </NavLink>
      </Fragment>
    );
  }
}
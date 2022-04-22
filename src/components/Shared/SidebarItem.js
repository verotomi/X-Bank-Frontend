import { NavLink } from "react-router-dom";
import React, { Fragment } from "react";

export default class SidebarItem extends React.Component {
  render() {
    return (
      <Fragment>
        <NavLink className={this.props.status === "active" ? "nav-link" : "nav-link nav-link-disabled"} to={this.props.status === "active" ? this.props.link : ""}>
          <i className={this.props.icon}></i>
          <span>{this.props.name}</span>
        </NavLink>
      </Fragment>
    );
  }
}

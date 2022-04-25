import { NavLink } from "react-router-dom";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { toggleSidebar } from "../../actions/actions";

/**
 * Az oldalsó menü alkotóeleme
 */
class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  
  handleOnClick(){
    (window.innerWidth < 600) && this.props.toggleSidebar();      
  }
  
  render() {
    return (
      <Fragment>
        <NavLink
         onClick={this.handleOnClick}
          className={this.props.status === "active" ? "nav-link" : "nav-link nav-link-disabled"}
          to={this.props.status === "active" ? this.props.link : ""}
        >
          <i className={this.props.icon}></i>
          <span>{this.props.name}</span>
        </NavLink>
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  return state;
}
const mapDispatchToProps = {
  toggleSidebar,
};
export default connect(mapStateToProps, mapDispatchToProps)(SidebarItem);

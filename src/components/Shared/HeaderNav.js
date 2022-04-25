import { connect } from "react-redux";
import { Image, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { toggleSidebar } from "../../actions/actions";
import favicon from "../../assets/img/favicon.jpg";
import React, { Fragment } from "react";

/**
 * Fejléc
 * @param {*} props 
 */
function HeaderNav(props) {
  function handleOnclick(e) {
    e.preventDefault();
    props.toggleSidebar();
  }

  return (
    <Fragment>
      <Col className="d-flex align-items-center justify-content-start">
        <button className="hamburger-button toggle-sidebar-btn" onClick={handleOnclick}>
          <i className="bi bi-list"></i>
        </button>
        <NavLink to="/" className="logo d-flex align-items-center">
          <Image src={favicon} alt="" />
          <span className="d-none d-lg-block">X Bank</span>
        </NavLink>
      </Col>
    </Fragment>
  );
}

const mapDispatchToProps = {
  toggleSidebar,
};

export default connect(null, mapDispatchToProps)(HeaderNav);

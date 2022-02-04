import React from "react";
import favicon from '../../assets/img/favicon.jpg';
import { Image, Col, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { toggleSidebar } from '../../actions/actions'
import { NavLink } from "react-router-dom";

function Logo (props) {

  function handleOnclick(e){
    e.preventDefault()
    props.toggleSidebar()

  }
    return <>
        <Col className="d-flex align-items-center justify-content-start">
        <NavLink to="/" className="logo d-flex align-items-center">
            <Image src={favicon} alt=""/>
            <span className="d-none d-lg-block">X Bank</span>
        </NavLink>
        <Button className="removedstyles" onClick={handleOnclick}>
            <i className="bi bi-list toggle-sidebar-btn"></i>
        </Button>
      </Col>
    </>;
}

const mapDispatchToProps = {
  toggleSidebar
}
function mapStateToProps(state) {
  console.log(state)
  return state

}
export default connect(null, mapDispatchToProps)(Logo)

/*
if (select('.toggle-sidebar-btn')) {
  on('click', '.toggle-sidebar-btn', function(e) {
    select('body').classList.toggle('toggle-sidebar')
  })
}*/

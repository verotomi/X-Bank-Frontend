import React, { useState } from "react"
import { Button, Container, Dropdown, Modal, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { connect } from "react-redux";
//import LogoutButton from "../Main/LogoutButton"
import { tryToLogout } from '../../actions/actions'

function Profile(props) {
console.log("props")
console.log(props)
    //const userName = "Verovszki Tamás"
    const [isOpen, setOpenState] = useState(false);
    const openModal = () => setOpenState(true);
    const closeModal = () => setOpenState(false);


    function handleSubmit (e) {
      e.preventDefault()
      sessionStorage.clear();
      closeModal();
      props.tryToLogout()
    }
    return <>
      <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
              <li className="nav-item dropdown pe-3">
              <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {props.lastname + " " + props.firstname + " "}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">{props.lastname + " " + props.firstname} ügyfél</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Utolsó bejelentkezés: {props.last_login}</Dropdown.Item>
                      <Dropdown.Divider />

                      <Dropdown.Item onClick={handleChangePassword}>(icon) Jelszó változtatás</Dropdown.Item>
                      <Dropdown.Item onClick={openModal}>(icon) Kijelentkezés</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
              </li>
          </ul>
      </nav>
      <Modal show={isOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>
            <h5 className="card-title text-center pb-0 fs-4">Biztos, hogy ki szeretne jelentkezni?</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="card-body">
            <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
              <Button className="btn btn-success w-100" type="submit">Kijelentkezés</Button>
              <Button variant="secondary" onClick={closeModal} >Mégsem</Button>
            </form>
          </div>
          </Modal.Body>
      </Modal>
        </>
        //alert("Logout!")
 

    function handleChangePassword () {
        alert("Change password!")
    }


}

const mapDispatchToProps = { // ennek igazából más nevet is adhatunk. Ez a függvény a connect hatására lefut, így a benne lévő függvény is.
  tryToLogout
}


function mapStateToProps(state) { // ennek más nevet is adhatunk! A lenti connect hatására minden alkalommal meghívódik, ha a store változik
  //debugger
  //userName = state.fisrtname.toString;
  //console.log(`State: ${state}`)
  //console.log(`Token: ${state.token}`)
  //console.log(`Firstname: ${state.firstname}`)
  //debugger
  console.log(state)

  return state

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

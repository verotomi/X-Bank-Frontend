import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { tryToLogout } from '../../actions/actions'


function LogoutButton(props) {
  const [isOpen, setOpenState] = useState(false);
  const openModal = () => setOpenState(true);
  const closeModal = () => setOpenState(false);
  const [netbankId, setUserName] = useState();
  const [password, setPassword] = useState();
  
  const handleSubmit = (e) => {
    e.preventDefault()
    sessionStorage.clear();
    closeModal();
    props.tryToLogout()
  }

  return <>
      <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
              <li className="nav-item dropdown pe-3">
                  <button type="button" className="btn btn-outline-success" onClick={openModal}>Kijelentkezés</button>
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
              <button className="btn btn-success w-100" type="submit">Kjelentkezés</button>
              <Button variant="secondary" onClick={closeModal}>Mégsem</Button>
            </form>
          </div>
          </Modal.Body>
      </Modal>
  </>;
}
const mapDispatchToProps = { // ennek igazából más nevet is adhatunk. Ez a függvény a connect hatására lefut, így a benne lévő függvény is.
  tryToLogout
}

export default connect(null, mapDispatchToProps)(LogoutButton);
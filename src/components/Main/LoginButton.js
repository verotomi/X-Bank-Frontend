import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { tryToLogin } from '../../actions/actions'

async function loginUser(credentials) {
  return fetch('http://localhost/15WL/X-Bank/_Backend/X-Bank/login', {
  //return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

function LoginButton(props) {
  const [isOpen, setOpenState] = useState(false);
  const openModal = () => setOpenState(true);
  const closeModal = () => setOpenState(false);
  const [netbankId, setUserName] = useState();
  const [password, setPassword] = useState();
  
  
  const handleSubmit = async e => {
    e.preventDefault();
    const fetchedData = await loginUser({
      "netbankId": netbankId,
      "password": password
    });
    closeModal();
    const token = fetchedData["token"];
    //setUserData(JSON.stringify(token));
    props.setUserData(fetchedData);
    props.tryToLogin(fetchedData)
  }

  return <>
      <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
              <li className="nav-item dropdown pe-3">
                  <button type="button" className="btn btn-outline-success" onClick={openModal}>Bejelentkezés</button>
              </li>
          </ul>
      </nav>
      <Modal className="login-modal" show={isOpen} onHide={closeModal}>
          <Modal.Header closeButton>
              <Modal.Title>
              <h5 className="card-title text-center pb-0 fs-4">Bejelentkezés</h5> 
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="card-body">
            <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
              <div className="col-12">
                <label for="yourUsername" className="form-label">Mobilbank azonosító:</label>
                  <input type="text" onChange={e => setUserName(e.target.value)} name="mobilebank_id" className="form-control  has-validation" id="yourUsername" required/>
                  <div className="invalid-feedback">Kérem adja meg a mobilbank azonosítóját!</div>
              </div>

              <div className="col-12">
                <label htmlFor="yourPassword" className="form-label">Jelszó:</label>
                <input type="password" onChange={e => setPassword(e.target.value)} name="passwword" className="form-control" id="yourPassword" required/>
                <div className="invalid-feedback">Kérem adja meg jelszavát!</div>
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe"/>
                  <label className="form-check-label" for="rememberMe">Emlékezzen rám</label>
                </div>
              </div>
              <div className="col-12">
                <button className="btn btn-success w-100" type="submit">Bejelentkezés</button>
              </div>
              <div className="col-12">
                <p className="small mb-0"><a href="pages-register.html">Elfelejtett jelszó</a></p>
              </div>
            </form>
          </div>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>Mégsem</Button>
          </Modal.Footer>
      </Modal>
  </>;
}

const mapDispatchToProps = { // ennek igazából más nevet is adhatunk. Ez a függvény a connect hatására lefut, így a benne lévő függvény is.
  tryToLogin
}

export default connect(null, mapDispatchToProps)(LoginButton)
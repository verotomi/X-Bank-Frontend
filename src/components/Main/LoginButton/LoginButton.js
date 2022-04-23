import { ApiContext } from "../../../api/ApiProvider";
import { connect } from "react-redux";
import { evaluate } from "../../../assets/script/scripts";
import { Modal, Button, Alert, Card } from "react-bootstrap";
import { tryToLogin } from "../../../actions/actions";
import React, { Fragment, useContext, useState } from "react";

function LoginButton(props) {
  const [isOpen, setOpenState] = useState(false);
  const [loginResponse, setLoginResponse] = useState("");
  const [netbankId, setNetbankId] = useState();
  const [password, setPassword] = useState();
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);
  const [validationResponse, setValidationResponse] = useState("");
  const apiContext = useContext(ApiContext);
  const closeModal = () => setOpenState(false);
  const openModal = () => setOpenState(true);

  function handleSubmit(e) {
    e.preventDefault();
    let isValidationOk = true;
    setShowAlert1(false);
    setShowAlert2(false);
    setShowAlert3(false);
    isValidationOk = validate(netbankId, "required", setShowAlert1);
    if (isValidationOk) {
      isValidationOk = validate(netbankId, "minLength", setShowAlert1, { value: 8 });
    }
    if (isValidationOk) {
      isValidationOk = validate(netbankId, "maxLength", setShowAlert1, { value: 32 });
    }
    if (isValidationOk) {
      isValidationOk = validate(password, "required", setShowAlert2);
    }
    if (isValidationOk) {
      isValidationOk = validate(password, "minLength", setShowAlert2, { value: 8 });
    }
    if (isValidationOk) {
      isValidationOk = validate(password, "maxLength", setShowAlert2, { value: 32 });
    }
    if (isValidationOk) {
      tryToLogin();
    }
  }

  function validate(fieldValue, criterium, setShowAlert, opts) {
    const validationResponse = evaluate(fieldValue, criterium, opts);
    setValidationResponse(validationResponse);
    if (validationResponse === "OK") {
      return true;
    } else {
      setShowAlert(true);
      return false;
    }
  }

  const tryToLogin = async (e) => {
    const fetchedData = await apiContext.loginUser({
      netbankId: netbankId,
      password: password,
    });
    if (!fetchedData["error"]) {
      closeModal();
      props.setUserData(fetchedData);
      props.tryToLogin(fetchedData);
    } else {
      setShowAlert3(true);
      setLoginResponse(fetchedData["error"]);
    }
  };

  function onNetbankIdChange(e) {
    setShowAlert1(false);
    setNetbankId(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
    setShowAlert2(false);
  }

  function handleAlertClose() {
    setShowAlert1(false);
    setShowAlert2(false);
    setShowAlert3(false);
  }

  return (
    <Fragment>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown pe-3">
            <button type="button" id="login-button" className="btn btn-outline-primary" onClick={openModal}>
              <i className="bi bi-box-arrow-in-right"></i>Bejelentkezés
            </button>
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
          <Card.Body className="pb-0">
            <form onSubmit={handleSubmit} className="row g-3" noValidate>
              <div className="col-12 login-form">
                <label htmlFor="yourUsername" className="form-label">
                  Netbank azonosító:
                </label>
                <Alert
                  className="validationAlert"
                  variant="danger"
                  onClose={() => handleAlertClose()}
                  show={showAlert1}
                  dismissible
                >
                  {validationResponse.error}
                </Alert>
                <input
                  type="text"
                  onChange={onNetbankIdChange}
                  onClick={() => handleAlertClose()}
                  name="mobilebank_id"
                  className="form-control has-validation"
                  id="yourUsername"
                  value={netbankId}
                  required
                />
                <div className="invalid-feedback">Kérem adja meg a netbank azonosítóját!</div>
              </div>
              <div className="col-12 login-form">
                <label htmlFor="yourPassword" className="form-label">
                  Jelszó:
                </label>
                <Alert className="validationAlert2" variant="danger" onClose={() => setShowAlert2(false)} show={showAlert2}>
                  {validationResponse.error}
                </Alert>
                <input
                  type="password"
                  onChange={onPasswordChange}
                  onClick={() => handleAlertClose()}
                  name="password"
                  className="form-control"
                  id="yourPassword"
                  required
                />
                <div className="invalid-feedback">Kérem adja meg jelszavát!</div>
              </div>
              <Alert
                className="validationAlert3"
                variant="danger"
                onClose={() => setShowAlert3(false)}
                show={showAlert3}
                dismissible
              >
                {loginResponse}
              </Alert>
              <button className="btn btn-success w-100" type="submit">
                Bejelentkezés
              </button>
              <Button variant="secondary" onClick={closeModal}>
                Mégsem
              </Button>
            </form>
          </Card.Body>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

const mapDispatchToProps = {
  tryToLogin,
};

export default connect(null, mapDispatchToProps)(LoginButton);

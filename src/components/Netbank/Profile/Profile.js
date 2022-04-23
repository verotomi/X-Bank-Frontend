import { Alert, Button, Card, Dropdown, Modal } from "react-bootstrap";
import { ApiContext } from "../../../api/ApiProvider";
import { connect } from "react-redux";
import { evaluate, sessionExpired } from "../../../assets/script/scripts";
import { tryToLogout } from "../../../actions/actions";
import React, { Fragment, useContext, useState } from "react";
import { LogoutModal } from "../../../modals/LogoutModal";

/**
 * 
 * @param {*} props 
 * @returns 
 */
function Profile(props) {
  const [alert4Color, setAlert4Color] = useState("danger");
  const [buttonsAreDisabled, setButtonsAreDisabled] = useState(false);
  const [isError, setisError] = useState(false);
  const [isOpen, setOpenState] = useState(false);
  const [isOpen2, setOpenState2] = useState(false);
  const [newPassword1, setNewPassword1] = useState("b");
  const [newPassword2, setNewPassword2] = useState("c");
  const [oldPassword, setOldPassword] = useState("");
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);
  const [showAlert4, setShowAlert4] = useState(false);
  const [validationResponse, setValidationResponse] = useState("");
  const apiContext = useContext(ApiContext);
  const closeModal = () => setOpenState(false);
  const openModal = () => setOpenState(true);
  const openModal2 = () => setOpenState2(true);

  function closeModal2() {
    setButtonsAreDisabled(false);
    setisError(false);
    setNewPassword1("");
    setNewPassword2("");
    setOldPassword("");
    setOpenState2(false);
    setShowAlert1(false);
    setShowAlert2(false);
    setShowAlert3(false);
    setShowAlert4(false);
  }

  const handleSubmitLogout = async (e) => {
    e.preventDefault();
    const fetchedData = await apiContext.logoutUser(
      {
        id_user: props.id,
        netbank_id: props.netbank_id,
      },
      props.token
    );
    if (!fetchedData["error"]) {
      sessionStorage.clear();
      closeModal();
      props.tryToLogout();
    }
  };

  function handleSubmitChangePassword(e) {
    e.preventDefault();
    let isValidationOk = true;
    setShowAlert1(false);
    setShowAlert2(false);
    setShowAlert3(false);
    setShowAlert4(false);
    function validate(fieldValue, criterium, setShowAlert, opts) {
      let validationResponse = evaluate(fieldValue, criterium, opts);
      setValidationResponse(validationResponse);
      if (validationResponse === "OK") {
        return true;
      } else {
        setShowAlert(true);
        return false;
      }
    }
    isValidationOk = validate(oldPassword, "required", setShowAlert1);
    if (isValidationOk) {
      isValidationOk = validate(oldPassword, "minLength", setShowAlert1, { value: 8 });
    }
    if (isValidationOk) {
      isValidationOk = validate(oldPassword, "maxLength", setShowAlert1, { value: 32 });
    }
    if (isValidationOk) {
      isValidationOk = validate(newPassword1, "required", setShowAlert2);
    }
    if (isValidationOk) {
      isValidationOk = validate(newPassword1, "minLength", setShowAlert2, { value: 8 });
    }
    if (isValidationOk) {
      isValidationOk = validate(newPassword1, "maxLength", setShowAlert2, { value: 32 });
    }
    if (isValidationOk) {
      isValidationOk = validate(newPassword2, "required", setShowAlert3);
    }
    if (isValidationOk) {
      isValidationOk = validate(newPassword2, "minLength", setShowAlert3, { value: 8 });
    }
    if (isValidationOk) {
      isValidationOk = validate(newPassword2, "maxLength", setShowAlert3, { value: 32 });
    }
    if (isValidationOk) {
      if (newPassword1 === newPassword2) {
        tryToChangePassword();
      } else {
        setAlert4Color("danger");
        setValidationResponse("Az új jelszavak nem egyeznek!");
        setShowAlert4(true);
      }
    }
  }

  const tryToChangePassword = async (e) => {
    setButtonsAreDisabled(true);
    const fetchedData = await apiContext.changePassword(
      {
        id_user: props.id,
        netbank_id: props.netbank_id,
        old_password: oldPassword,
        password: newPassword1,
      },
      props.token
    );
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(this.props);
    } else if (!fetchedData["error"]) {
      setValidationResponse("A jelszó módosítás sikeresen megtörtént!");
      setAlert4Color("success");
      setShowAlert4(true);
      setisError(false);
    } else {
      setAlert4Color("danger");
      setValidationResponse(fetchedData["error"]);
      setisError(true);
      setShowAlert4(true);
    }
  };

  function handleAlert4Close() {
    setShowAlert4(false);
    setButtonsAreDisabled(false);
    if (newPassword1 === newPassword2 && !isError) {
      closeModal2();
    }
  }

  function handleClick() {
    setShowAlert1(false);
    setShowAlert2(false);
    setShowAlert3(false);
    setShowAlert4(false);
    setButtonsAreDisabled(false);
  }

  return (
    <Fragment>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown pe-3">
            <Dropdown>
              <Dropdown.Toggle className="" variant="success" id="profile-button">
                <i className="bi bi-person"></i>
                {" " + props.lastname + " " + props.firstname + " "}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Header id="dropdown-header-profile">
                  <p>
                    <b>
                      <i className="bi bi-person"></i> {props.lastname + " " + props.firstname + " "}
                    </b>
                    {props.netbank_id === "admin001" ? "adminisztrátor " : "lakossági ügyfél"}
                  </p>
                  <p>
                    <i className="bi bi-clock-history"></i> Utolsó bejelentkezés ideje: {props.last_login}
                  </p>
                </Dropdown.Header>
                <Dropdown.Item onClick={openModal2}>
                  <i className="bi bi-gear"></i> Jelszó változtatás
                </Dropdown.Item>
                <hr id="dropdown-divider"></hr>
                <Dropdown.Item onClick={openModal}>
                  <i className="bi bi-box-arrow-right"></i> Kijelentkezés
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </nav>
      <LogoutModal showModal={isOpen} handleClose={closeModal} handleLogout={handleSubmitLogout}/>
      <Modal show={isOpen2} onHide={closeModal2}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="card-title text-center pb-0 fs-4">Jelszó változtatás</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Body className="pb-0">
            <form onSubmit={handleSubmitChangePassword} className="row g-3" noValidate>
              <div className="col-12 login-form">
                <label htmlFor="yourPassword" className="form-label">
                  Jelenlegi jelszó:
                </label>
                <Alert variant="danger" onClose={() => setShowAlert1(false)} show={showAlert1} dismissible>
                  {validationResponse.error}
                </Alert>
                <input
                  type="password"
                  autoComplete="off"
                  onClick={handleClick}
                  onChange={(e) => setOldPassword(e.target.value)}
                  name="oldPassword"
                  className="form-control"
                  id="oldPassword"
                  required
                />
                <div className="invalid-feedback">Kérem adja meg jelszavát!</div>
              </div>
              <div className="col-12 login-form">
                <label htmlFor="yourPassword" className="form-label">
                  Új jelszó:
                </label>
                <Alert variant="danger" onClose={() => setShowAlert2(false)} show={showAlert2} dismissible>
                  {validationResponse.error}
                </Alert>
                <input
                  type="password"
                  autoComplete="off"
                  onClick={handleClick}
                  onChange={(e) => setNewPassword1(e.target.value)}
                  name="newPassword1"
                  className="form-control"
                  id="newPassword1"
                  required
                />
                <div className="invalid-feedback">Kérem adja meg jelszavát!</div>
              </div>
              <div className="col-12 login-form">
                <label htmlFor="yourPassword" className="form-label">
                  Új jelszó mégegyszer:
                </label>
                <Alert variant="danger" onClose={() => setShowAlert3(false)} show={showAlert3} dismissible>
                  {validationResponse.error}
                </Alert>
                <input
                  type="password"
                  autoComplete="off"
                  onClick={handleClick}
                  onChange={(e) => setNewPassword2(e.target.value)}
                  name="newPassword2"
                  className="form-control"
                  id="newPassword2"
                  required
                />
                <div className="invalid-feedback">Kérem adja meg jelszavát!</div>
              </div>
              <Alert variant={alert4Color} onClose={handleAlert4Close} show={showAlert4} dismissible>
                {validationResponse}
              </Alert>
              <Button className="btn btn-success w-100" type="submit" disabled={buttonsAreDisabled}>
                Mentés
              </Button>
              <Button variant="secondary" onClick={closeModal2} disabled={buttonsAreDisabled}>
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
  tryToLogout,
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

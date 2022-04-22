import { ApiContext } from "../../../api/ApiProvider";
import { connect } from "react-redux";
import { evaluate, sessionExpired } from "../../../assets/script/scripts";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Card, Alert } from "react-bootstrap";
import { tryToLogout, showLoggedOutModal } from "../../../actions/actions";
import { useLocation } from "react-router-dom";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import React, { Fragment, useContext, useState } from "react";

function EditBeneficiary(props) {
  const apiContext = useContext(ApiContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [button1IsDisabled, setButton1IsDisabled] = useState(true);
  const [button2IsDisabled, setButton2IsDisabled] = useState(false);
  const [alert4Color, setAlert4Color] = useState(false);
  const [inputsAreReadonly, setInputsAreReadonly] = useState(false);
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState(location.state.name);
  const [partnerAccountNumber, setPartnerAccountNumber] = useState(location.state.partner_account_number);
  const [partnerName, setPartnerName] = useState(location.state.partner_name);
  const [previousPartnerAccountNumber, setPreviousPartnerAccountNumber] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);
  const [showAlert4, setShowAlert4] = useState(false);
  const [validationResponse, setValidationResponse] = useState("");
  const { id } = location.state;

  function handleAlert4Close() {
    setShowAlert4(false);
    setButton1IsDisabled(false);
    setButton2IsDisabled(false);
    if (!isError) {
      navigate("../kedvezmenyezettek", { replace: false });
    }
  }

  function handleInputName(e) {
    setName(e.target.value);
    setButton1IsDisabled(false);
  }

  function handleInputPartnerName(e) {
    setPartnerName(e.target.value);
    setButton1IsDisabled(false);
  }

  function handleInputPartnerAccountNumber(e) {
    setButton1IsDisabled(false);
    const x = String(e.target.value);
    if (x.length < 27) {
      setPreviousPartnerAccountNumber(partnerAccountNumber);
      if (
        (x.length === 8 && previousPartnerAccountNumber.length < 8) ||
        (x.length === 17 && previousPartnerAccountNumber.length < 17)
      ) {
        setPartnerAccountNumber(e.target.value + "-");
      } else if (
        (x.length === 9 && previousPartnerAccountNumber.length > 9) ||
        (x.length === 18 && previousPartnerAccountNumber.length > 18)
      ) {
        setPartnerAccountNumber(e.target.value.substring(0, e.target.value.length - 1));
      } else {
        setPartnerAccountNumber(e.target.value);
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    let isValidationOk = true;
    setShowAlert1(false);
    setShowAlert2(false);
    setShowAlert3(false);
    setShowAlert4(false);
    isValidationOk = validate(name, "required", setShowAlert1);
    if (isValidationOk) {
      isValidationOk = validate(name, "maxLength", setShowAlert1, { value: 32 });
    }
    if (isValidationOk) {
      isValidationOk = validate(partnerName, "required", setShowAlert2);
    }
    if (isValidationOk) {
      isValidationOk = validate(partnerName, "maxLength", setShowAlert2, { value: 65 });
    }
    if (isValidationOk) {
      isValidationOk = validate(partnerAccountNumber, "required", setShowAlert3);
    }
    if (isValidationOk) {
      isValidationOk = validate(partnerAccountNumber, "validBankAccountNumber", setShowAlert3, { value: 32 });
    }
    if (isValidationOk) {
      startQuery();
    }
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
  }

  const startQuery = async (e) => {
    const data = {
      id: id,
      name: name,
      id_user: props.id,
      partner_name: partnerName,
      partner_account_number: partnerAccountNumber,
    };

    const fetchedData = await apiContext.updateBeneficiary(data, props.token).then();
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(props);
    } else if (!fetchedData["error"]) {
      setValidationResponse("Sikeres rögzítés");
      setAlert4Color("success");
      setShowAlert4(true);
      setIsError(false);
      setButton1IsDisabled(true);
      setButton2IsDisabled(true);
      setInputsAreReadonly(true);
    } else {
      setValidationResponse(fetchedData["error"]);
      setAlert4Color("danger");
      setShowAlert4(true);
      setIsError(true);
      setButton1IsDisabled(true);
    }
  };

  function handleClick() {
    if (!isError && showAlert4) {
    } else {
      setShowAlert1(false);
      setShowAlert2(false);
      setShowAlert3(false);
      setShowAlert4(false);
      setButton2IsDisabled(false);
    }
  }

  return (
    <Fragment>
      <BreadCrumbs
        data={[
          { name: "Netbank", link: "/attekintes" },
          { name: "Kedvezményezettek", link: "/kedvezmenyezettek" },
          { name: "Kedvezményezett módosítása", link: "" },
        ]}
      />
      <div className="dashboard">
        <Row>
          <Col lg="12">
            <Card className="card netbank-card">
              <Card.Body className="card-body pb-0">
                <div className="d-flex flex-row">
                  <div className="card-icon d-flex align-items-center justify-content-center">
                    <i className="bi bi-pencil-square"></i>
                  </div>
                  <h5 className="card-title">Kedvezményezett módosítása</h5>
                </div>
                <form className="row g-2 netbank-form">
                  <div className="col-12 form-item">
                    <label htmlFor="inputTemplateName" className="form-label first-label">
                      Sablon neve
                    </label>
                    <Alert variant="danger" onClose={() => setShowAlert1(false)} show={showAlert1} dismissible>
                      {validationResponse.error}
                    </Alert>
                    <input
                      type="text"
                      onClick={handleClick}
                      onChange={handleInputName}
                      value={name}
                      readOnly={inputsAreReadonly}
                      className="form-control"
                      id="inputTemplateName"
                      placeholder="sablon neve"
                    />
                  </div>
                  <div className="col-12 form-item">
                    <label htmlFor="inputPartnerName" className="form-label">
                      Kedvezményezett neve
                    </label>
                    <Alert variant="danger" onClose={() => setShowAlert2(false)} show={showAlert2} dismissible>
                      {validationResponse.error}
                    </Alert>
                    <input
                      type="text"
                      onClick={handleClick}
                      onChange={handleInputPartnerName}
                      onKeyPress={(event) => {
                        if (!/[a-zA-Z. öÖüÜóÓőŐúÚűŰíÍéÉáÁ]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      value={partnerName}
                      readOnly={inputsAreReadonly}
                      className="form-control"
                      id="inputPartnerName"
                      placeholder="partner neve"
                    />
                  </div>
                  <div className="col-12 form-item">
                    <label htmlFor="inputTargetAccountNumber" className="form-label">
                      Célszámla
                    </label>
                    <Alert variant="danger" onClose={() => setShowAlert3(false)} show={showAlert3} dismissible>
                      {validationResponse.error}
                    </Alert>
                    <input
                      type="text"
                      onChange={handleInputPartnerAccountNumber}
                      onClick={handleClick}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      value={partnerAccountNumber}
                      readOnly={inputsAreReadonly}
                      className="form-control"
                      id="inputTargetAccountNumber"
                      placeholder="00000000-00000000-00000000"
                    />
                  </div>
                  <Alert variant={alert4Color} onClose={handleAlert4Close} show={showAlert4} dismissible>
                    {validationResponse}
                  </Alert>
                  <div className="text-center form-item">
                    <button
                      onClick={handleSubmit}
                      disabled={button1IsDisabled}
                      type="submit"
                      className="btn btn-success form-button"
                    >
                      Mentés
                    </button>
                    <Link
                      to="/kedvezmenyezettek"
                      className={button2IsDisabled ? "btn btn-secondary disabled" : "btn btn-secondary"}
                    >
                      Mégsem
                    </Link>
                  </div>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = {
  tryToLogout,
  showLoggedOutModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBeneficiary);

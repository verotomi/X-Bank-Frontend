import { ApiContext } from "../../../api/ApiProvider";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Card, Alert } from "react-bootstrap";
import { translate, formatAmount, evaluate, sessionExpired } from "../../../assets/script/scripts";
import { tryToLogout, showLoggedOutModal } from "../../../actions/actions";
import { useLocation } from "react-router-dom";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import React, { Fragment, useContext, useEffect, useState } from "react";

const weeklyOptions = ["hétfőjén", "keddjén", "szerdáján", "csütörtökén", "péntekén", "szombatján", "vasárnapján"];
const monthlyOptions = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16",
  "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
]

function EditRecurringTransfer(props) {
  const location = useLocation();
  const [actualOptions, setActualOptions] = useState([]);
  const [alert5Color, setAlert5Color] = useState("danger");
  const [amount, setAmount] = useState(location.state.amount);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [button1IsDisabled, setButton1IsDisabled] = useState(true);
  const [button2IsDisabled, setButton2IsDisabled] = useState(false);
  const [checkBosIsDisabled, setCheckBosIsDisabled] = useState(true);
  const [comment, setComment] = useState(location.state.comment);
  const [currency, setCurrency] = useState(location.state.currency);
  const [days, setDays] = useState(location.state.days);
  const [frequency, setFrequency] = useState(location.state.frequency);
  const [isChecked, setIsChecked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);
  const [isSwitchActive, setIsSwitchActive] = useState(location.state.recurring_transfer_status === "Active" ? true : false);
  const [name, setName] = useState(location.state.name);
  const [partnerAccountNumber, setPartnerAccountNumber] = useState(location.state.partner_account_number);
  const [partnerName, setPartnerName] = useState(location.state.partner_name);
  const [previousPartnerAccountNumber, setPreviousPartnerAccountNumber] = useState(location.state.partner_account_number);
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);
  const [showAlert4, setShowAlert4] = useState(false);
  const [showAlert5, setShowAlert5] = useState(false);
  const [sourceAccountNumberId, setSourceAccountNumberId] = useState(location.state.id_bank_account_number);
  const [status, setStatus] = useState(location.state.recurring_transfer_status);
  const [validationResponse, setValidationResponse] = useState(false);
  const [inputsAreReadonly, setInputsAreReadonly] = useState(false);
  const apiContext = useContext(ApiContext);
  const navigate = useNavigate();
  const [selectSourceAccountValue] = useState(
    translate(location.state.type) +
      " - " +
      location.state.number +
      " - " +
      formatAmount(location.state.balance) +
      " " +
      location.state.currency
  );

  useEffect(() => {
    apiContext.getBeneficiaries(location.state.id, props.token).then((beneficiaries) => {
      setBeneficiaries(beneficiaries);
    });
    switch (location.state.frequency) {
      case "Every day":
        setFrequency("Minden nap");
        setActualOptions([]);
        setIsSelectDisabled(true);
        setDays("-");
        break;
      case "Every week":
        setFrequency("Minden hét");
        setActualOptions(weeklyOptions);
        setIsSelectDisabled(false);
        break;
      case "Every month":
        setFrequency("Minden hónap");
        setActualOptions(monthlyOptions);
        setIsSelectDisabled(false);
        break;
      default:
        break;
    }
    switch (location.state.days) {
      case "Monday":
        setDays("hétfőjén");
        break;
      case "Tuesday":
        setDays("keddjén");
        break;
      case "Wednesday":
        setDays("szerdáján");
        break;
      case "Thursday":
        setDays("csütörtökén");
        break;
      case "Friday":
        setDays("péntekén");
        break;
      case "Saturday":
        setDays("szombatján");
        break;
      case "Sunday":
        setDays("vasárnapján");
        break;
      default:
        break;
    }

    if (location.state.days.toString().length < 3 && location.state.days !== "-") {
      setDays(location.state.days + ". napján");
    }
  }, [apiContext, location.state.days, location.state.frequency, location.state.id, props.token]);

  function handleClickCheckBox() {
    setButton1IsDisabled(false);
    setIsChecked(!isChecked);
  }

  function handleSwitchChange(e) {
    setButton1IsDisabled(false);
    setIsSwitchActive(!isSwitchActive);
    setStatus(status === "Active" ? "Inactive" : "Active");
  }

  function handleSelectFrequency(e) {
    setButton1IsDisabled(false);
    setFrequency(e.currentTarget.value);
    switch (e.currentTarget.value) {
      case "Minden nap":
        setActualOptions([]);
        setIsSelectDisabled(true);
        setDays("-");
        break;
      case "Minden hét":
        setActualOptions(weeklyOptions);
        setIsSelectDisabled(false);
        setDays("hétfőjén");
        break;
      case "Minden hónap":
        setActualOptions(monthlyOptions);
        setIsSelectDisabled(false);
        setDays("1. napján");
        break;
      default:
        break;
    }
  }

  function handleSelectDays(e) {
    setButton1IsDisabled(false);
    setDays(e.currentTarget.value);
  }

  function handleSelectPartner(e) {
    try {
      if (e.target.value === "") {
        setPartnerName("");
      } else {
        setButton1IsDisabled(false);
        setPartnerName(e.currentTarget.value.split(" - ")[1]);
        setPartnerAccountNumber(e.currentTarget.value.split(" - ")[2]);
        setIsChecked(false);
        setCheckBosIsDisabled(true);
      }
    } catch (error) {
      setPartnerName(e.target.value);
      setPartnerAccountNumber("");
      setCheckBosIsDisabled(false);
    }
  }

  function handleSelectSourceAccountNumber(e) {
    setButton1IsDisabled(false);
    setSourceAccountNumberId(props.accounts[e.currentTarget.selectedIndex].id);
    setCurrency(props.accounts[e.currentTarget.selectedIndex].currency);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let isValidationOk = true;
    setShowAlert1(false);
    setShowAlert2(false);
    setShowAlert3(false);
    setShowAlert4(false);
    setShowAlert5(false);
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
      isValidationOk = validate(partnerAccountNumber, "validBankAccountNumber", setShowAlert3);
    }
    if (isValidationOk) {
      isValidationOk = validate(amount, "required", setShowAlert4);
    }
    if (isValidationOk) {
      isValidationOk = validate(amount, "lessThanZero", setShowAlert4);
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

  function handleInputComment(e) {
    setButton1IsDisabled(false);
    const value = String(e.target.value);
    if (value.length < 97) {
      setComment(e.target.value);
    }
  }

  function handleInputPartnerAccountNumber(e) {
    setButton1IsDisabled(false);
    const value = String(e.target.value);
    if (value.length < 27) {
      setPreviousPartnerAccountNumber(partnerAccountNumber);
      if (
        (value.length === 9 && previousPartnerAccountNumber.length < 8) ||
        (value.length === 18 && previousPartnerAccountNumber.length < 17)
      ) {
        const text1 = e.target.value.slice(0, e.target.value.length - 1);
        const text2 = e.target.value.slice(e.target.value.length - 1);
        setPartnerAccountNumber(text1 + "-" + text2);
      } else if (
        (value.length === 9 && previousPartnerAccountNumber.length > 9) ||
        (value.length === 18 && previousPartnerAccountNumber.length > 18)
      ) {
        setPartnerAccountNumber(e.target.value.substring(0, e.target.value.length - 1));
      } else {
        setPartnerAccountNumber(e.target.value);
      }
    }
  }

  function handleInputAmount(e) {
    setButton1IsDisabled(false);
    setAmount(e.target.value);
  }

  function handleInputName(e) {
    setButton1IsDisabled(false);
    setName(e.target.value);
  }

  function handleClick() {
    if (!isError && showAlert5) {
    } else {
      setShowAlert1(false);
      setShowAlert2(false);
      setShowAlert3(false);
      setShowAlert4(false);
      setShowAlert5(false);
      setButton2IsDisabled(false);
    }
  }

  function handleAlert5Close() {
    setShowAlert5(false);
    setButton1IsDisabled(false);
    setButton2IsDisabled(false);
    if (!isError) {
      setIsError(false);
      navigate("../allandomegbizasok", { replace: false });
    }
  }

  async function startQuery(e) {
    const data = {
      id: location.state.recurring_transfer_id,
      id_user: props.id, 
      id_bank_account_number: sourceAccountNumberId,
      name: name,
      currency: currency,
      amount: amount,
      partner_name: partnerName,
      partner_account_number: partnerAccountNumber,
      comment: comment,
      frequency: frequency,
      status: status,
      days: days === "-" ? days : days.toString().length > 2 ? days : parseInt(days),
    };

    switch (data.frequency) {
      case "Minden nap":
        data.frequency = "Every day";
        break;
      case "Minden hét":
        data.frequency = "Every week";
        break;
      case "Minden hónap":
        data.frequency = "Every month";
        break;
      default:
        break;
    }
    switch (data.days) {
      case "hétfőjén":
        data.days = "Monday";
        break;
      case "keddjén":
        data.days = "Tuesday";
        break;
      case "szerdáján":
        data.days = "Wednesday";
        break;
      case "csütörtökén":
        data.days = "Thursday";
        break;
      case "péntekén":
        data.days = "Friday";
        break;
      case "szombatján":
        data.days = "Saturday";
        break;
      case "vasárnapján":
        data.days = "Sunday";
        break;
      case "-":
        data.days = "-";
        break;
      default:
        break;
    }
    if (data.days.toString().includes(".")) {
      data.days = parseInt(data.days);
    }
    const fetchedData = await apiContext.updateRecurringTransfer(data, props.token).then();
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(props);
    } else if (!fetchedData["error"]) {
      setValidationResponse("A módosítás sikeresen megtörtént!");
      setAlert5Color("success");
      setShowAlert5(true);
      setButton1IsDisabled(true);
      setButton2IsDisabled(true);
      setIsError(false);
      setInputsAreReadonly(true);
      if (isChecked) {
        const data2 = {
          id_user: props.id,
          name: name,
          partner_name: partnerName,
          partner_account_number: partnerAccountNumber,
        };
        apiContext.createBeneficiary(data2, props.token).then();
      }
    } else {
      setValidationResponse(fetchedData["error"]);
      setAlert5Color("danger");
      setShowAlert5(true);
      setButton1IsDisabled(true);
      setButton2IsDisabled(true);
      setIsError(true);
    }
  }

  return (
    <Fragment>
      <BreadCrumbs
        data={[
          { name: "Netbank", link: "/attekintes" },
          { name: "Állandó megbízások", link: "/allandomegbizasok" },
          { name: "Állandó megbízás módosítása", link: "" },
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
                  <h5 className="card-title">Állandó megbízás módosítása</h5>
                </div>
                <form className="row g-2 netbank-form">
                  <div className="col-md-12 form-item">
                    <label htmlFor="selectSourceAccountNumber" className="form-label first-label">
                      Forrásszámla
                    </label>
                    <select
                      disabled={inputsAreReadonly}
                      id="selectSourceAccountNumber"
                      onChange={handleSelectSourceAccountNumber}
                      defaultValue={selectSourceAccountValue}
                      className="form-select"
                    >
                      {props.accounts.map((a) => (
                        <option key={a.id}>
                          {" "}
                          {translate(a.type)} - {a.number} - {formatAmount(a.balance)} {a.currency}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-9 form-item">
                    <label htmlFor="inputComment" className="form-label">
                      Állandó megbízás neve
                    </label>
                    <Alert variant="danger" onClose={() => setShowAlert1(false)} show={showAlert1} dismissible>
                      {validationResponse.error}
                    </Alert>
                    <input
                      type="text"
                      onClick={handleClick}
                      onChange={handleInputName}
                      className="form-control"
                      id="inputComment"
                      value={name}
                      placeholder="Pl.: Autó törlesztőrészlet "
                      readOnly={inputsAreReadonly}
                    />
                  </div>
                  <div className="col-md-3 form-item">
                    <label className="form-check form-check-label" htmlFor="gridCheck1">
                      Állandó megbízás állapota
                    </label>
                    <div className="mx-auto mt-2 default-cursor" style={{ textAlign: "center" }}>
                      <input
                        className="form-check-input"
                        onChange={handleSwitchChange}
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        checked={isSwitchActive}
                        readOnly={inputsAreReadonly}
                      />
                      <span onClick={handleSwitchChange}>{isSwitchActive ? " Aktív " : " Inaktív "}</span>
                    </div>
                  </div>
                  <div className="col-9 form-item">
                    <label htmlFor="inputPartnerName" className="form-label">
                      Kedvezményezett neve
                    </label>
                    <Alert variant="danger" onClose={() => setShowAlert2(false)} show={showAlert2} dismissible>
                      {validationResponse.error}
                    </Alert>
                    <input
                      type="inputPartnerName"
                      onClick={handleClick}
                      onChange={handleSelectPartner}
                      onKeyPress={(event) => {
                        if (!/[a-zA-Z. öÖüÜóÓőŐúÚűŰíÍéÉáÁ]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      className="form-control"
                      id="inputPartnerName"
                      placeholder="Partner neve"
                      value={partnerName}
                      list="dl"
                      readOnly={inputsAreReadonly}
                    />
                    <datalist id="dl">
                      {beneficiaries.map((a) => (
                        <option key={a.id}>
                          {" "}
                          {a.name} - {a.partner_name} - {a.partner_account_number}
                        </option>
                      ))}
                    </datalist>
                  </div>
                  <div className="col-md-3 form-item">
                    <label className="form-check-label" htmlFor="gridCheck1">
                      Kedvezményezett mentése
                    </label>
                    <div className="mx-auto mt-2" style={{ textAlign: "center" }}>
                      <input
                        className="form-check-input"
                        onClick={handleClickCheckBox}
                        checked={isChecked}
                        disabled={checkBosIsDisabled}
                        type="checkbox"
                        id="gridCheck1"
                      />
                    </div>
                  </div>
                  <div className="col-12 form-item">
                    <label htmlFor="inputPartnerAccountNumber" className="form-label">
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
                      className="form-control"
                      id="inputPartnerAccountNumber"
                      placeholder="00000000-00000000-00000000"
                      value={partnerAccountNumber}
                      readOnly={inputsAreReadonly}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputAmount" className="form-label">
                      Átutalandó összeg
                    </label>
                    <Alert variant="danger" onClose={() => setShowAlert4(false)} show={showAlert4} dismissible>
                      {validationResponse.error}
                    </Alert>
                    <input
                      type="number"
                      onChange={handleInputAmount}
                      onClick={handleClick}
                      className="form-control"
                      id="inputAmount"
                      defaultValue={amount}
                      readOnly={inputsAreReadonly}
                    />
                  </div>
                  <div className="col-md-2 form-item">
                    <label htmlFor="inputCurrency" className="form-label">
                      Pénznem
                    </label>
                    <input type="text" className="form-control" id="inputCurrency" readOnly value={currency} />
                  </div>
                  <div className="col-md-6 form-item">
                    <label htmlFor="selectPartnerName" className="form-label">
                      Átutalás gyakorisága
                    </label>
                    <select
                      id="selectPartnerName"
                      onChange={handleSelectFrequency}
                      value={frequency}
                      disabled={inputsAreReadonly}
                      className="form-select"
                    >
                      <option>Minden nap</option>
                      <option>Minden hét</option>
                      <option>Minden hónap</option>
                    </select>
                  </div>
                  <div className="col-md-6 form-item">
                    <label htmlFor="selectPartnerName" className="form-label">
                      Ismétlődés
                    </label>
                    <select
                      disabled={isSelectDisabled || inputsAreReadonly}
                      id="selectPartnerName"
                      onChange={handleSelectDays}
                      value={days}
                      readOnly={inputsAreReadonly}
                      className="form-select"
                    >
                      {actualOptions.map((a) => (
                        <option key={a.recurring_transfer_id}>{a.length > 2 ? a : a + ". napján"}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 form-item">
                    <label htmlFor="inputComment" className="form-label">
                      Közlemény
                    </label>
                    <input
                      type="text"
                      onChange={handleInputComment}
                      className="form-control"
                      id="inputComment"
                      readOnly={inputsAreReadonly}
                      placeholder="2022/021 számla"
                      value={comment}
                    />
                  </div>
                  <Alert variant={alert5Color} onClose={handleAlert5Close} show={showAlert5} dismissible>
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
                      to="/allandomegbizasok"
                      disabled={button2IsDisabled}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditRecurringTransfer);

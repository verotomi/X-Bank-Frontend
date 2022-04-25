import { ApiContext } from "../../../api/ApiProvider";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Card, Alert } from "react-bootstrap";
import { translate, formatAmount, evaluate, sessionExpired } from "../../../assets/script/scripts";
import { tryToLogout, showLoggedOutModal } from "../../../actions/actions";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import React, { Fragment } from "react";

const weeklyOptions = ["hétfőjén", "keddjén", "szerdáján", "csütörtökén", "péntekén", "szombatján", "vasárnapján"];
const monthlyOptions = [
  "1. napján", "2. napján", "3. napján", "4. napján", "5. napján", "6. napján", "7. napján", "8. napján",
  "9. napján", "10. napján", "11. napján", "12. napján", "13. napján", "14. napján", "15. napján", "16. napján",
  "17. napján", "18. napján", "19. napján", "20. napján", "21. napján", "22. napján", "23. napján", "24. napján",
  "25. napján", "26. napján", "27. napján", "28. napján", "29. napján", "30. napján", "31. napján"
]

/**
 * Új állandó megbízás rögzítése
 */
class NewRecurringTransfer extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      actualOptions: [],
      alert4Color: "danger",
      amount: "",
      beneficiaries: [],
      buttonsAreDisabled: false,
      comment: "",
      currency: "",
      days: "-",
      frequency: "Every day",
      isChecked: false,
      isDisabled: false,
      isError: false,
      isOptionsInputHidden: false,
      isSelectDisabled: true,
      isTextInputHidden: true,
      name: "",
      partnerAccountNumber: "",
      partnerName: "",
      previousPartnerAccountNumber: "",
      showAlert1: false,
      showAlert2: false,
      showAlert3: false,
      showAlert4: false,
      showAlert5: false,
      sourceAccountNumberId: 1,
      validationResponse: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickCheckBox = this.handleClickCheckBox.bind(this);
    this.handleInputAmount = this.handleInputAmount.bind(this);
    this.handleInputComment = this.handleInputComment.bind(this);
    this.handleInputName = this.handleInputName.bind(this);
    this.handleInputPartnerAccountNumber = this.handleInputPartnerAccountNumber.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleInputComment(e) {
    const value = String(e.target.value);
    if (value.length < 97) {
      this.setState({ comment: e.target.value });
    }
  }

  handleInputPartnerAccountNumber(e) {
    const value = String(e.target.value);
    if (value.length < 27) {
      this.setState({ previousPartnerAccountNumber: this.state.partnerAccountNumber });
      if (
        (value.length === 9 && this.state.previousPartnerAccountNumber.length < 8) ||
        (value.length === 18 && this.state.previousPartnerAccountNumber.length < 17)
      ) {
        const text1 = e.target.value.slice(0, e.target.value.length - 1);
        const text2 = e.target.value.slice(e.target.value.length - 1);
        this.setState({ partnerAccountNumber: text1 + "-" + text2 });
      } else if (
        (value.length === 9 && this.state.previousPartnerAccountNumber.length > 9) ||
        (value.length === 18 && this.state.previousPartnerAccountNumber.length > 18)
      ) {
        this.setState({ partnerAccountNumber: e.target.value.substring(0, e.target.value.length - 1) });
      } else {
        this.setState({ partnerAccountNumber: e.target.value });
      }
    }
  }

  handleInputAmount(e) {
    this.setState({ amount: e.target.value });
  }

  handleInputName(e) {
    this.setState({ name: e.target.value });
  }

  handleClickCheckBox() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  componentDidMount() {
    this.context.getBeneficiaries(this.props.id, this.props.token).then((beneficiaries) => {
      this.setState({ ...this.state, beneficiaries: beneficiaries });
    });
    this.setState({ currency: this.props.accounts[0].currency });
  }

  handleClick() {
    if (!this.state.isError && this.state.showAlert5) {
      this.setState({ name: "" });
      this.setState({ partnerName: "" });
      this.setState({ partnerAccountNumber: "" });
      this.setState({ amount: "" });
      this.setState({ comment: "" });
    }
    this.setState({ showAlert1: false });
    this.setState({ showAlert2: false });
    this.setState({ showAlert3: false });
    this.setState({ showAlert4: false });
    this.setState({ showAlert5: false });
    this.setState({ buttonsAreDisabled: false });
  }

  handleSelectDays = (e) => {
    this.setState({ days: e.currentTarget.value });
    switch (e.currentTarget.value) {
      case "hétfőjén":
        this.setState({ days: "Monday" });
        break;
      case "keddjén":
        this.setState({ days: "Tuesday" });
        break;
      case "szerdáján":
        this.setState({ days: "Wednesday" });
        break;
      case "csütörtökén":
        this.setState({ days: "Thursday" });
        break;
      case "péntekén":
        this.setState({ days: "Friday" });
        break;
      case "szombatján":
        this.setState({ days: "Saturday" });
        break;
      case "vasárnapján":
        this.setState({ days: "Sunday" });
        break;
      default:
        break;
    }
  };

  handleSelectFrequency = (e) => {
    this.setState({ frequency: e.currentTarget.value });
    switch (e.currentTarget.value) {
      case "Minden hét":
        this.setState({ actualOptions: weeklyOptions });
        this.setState({ isSelectDisabled: false });
        this.setState({ days: "Monday" });
        break;
      case "Minden hónap":
        this.setState({ actualOptions: monthlyOptions });
        this.setState({ isSelectDisabled: false });
        this.setState({ days: "1" });
        break;
      case "Minden nap":
        this.setState({ actualOptions: [] });
        this.setState({ isSelectDisabled: true });
        this.setState({ days: "-" });
        break;
      default:
        break;
    }
  };

  handleSelectSourceAccountNumber = (e) => {
    this.setState({ sourceAccountNumberId: this.props.accounts[e.currentTarget.selectedIndex].id });
    this.setState({ currency: this.props.accounts[e.currentTarget.selectedIndex].currency });
  };

  handleSelectPartner = (e) => {
    if (e.target.value === "") {
      this.setState({ partnerName: "" });
    } else {
      if (e.currentTarget.value.split(" - ")[1] === undefined) {
        this.setState({ partnerName: e.target.value });
        this.setState({ isDisabled: false });
      } else {
        this.setState({ partnerName: e.currentTarget.value.split(" - ")[1] });
        this.setState({ partnerAccountNumber: e.currentTarget.value.split(" - ")[2] });
        this.setState({ isChecked: false });
        this.setState({ isDisabled: true });
      }
    }
  };

  validate(fieldValue, criterium, alertNumber, opts) {
    let validationResponse = evaluate(fieldValue, criterium, opts);
    this.setState({ validationResponse: validationResponse });
    if (validationResponse === "OK") {
      return true;
    } else {
      this.setState({ [`${alertNumber}`]: true });
      return false;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let isValidationOk = true;
    this.setState({
      showAlert1: false,
      showAlert2: false,
      showAlert3: false,
      showAlert4: false,
      showAlert5: false,
    });
    isValidationOk = this.validate(this.state.name, "required", "showAlert1");
    if (isValidationOk) {
      isValidationOk = this.validate(this.state.name, "maxLength", "showAlert1", { value: 32 });
    }
    if (isValidationOk) {
      isValidationOk = this.validate(this.state.partnerName, "required", "showAlert2");
    }
    if (isValidationOk) {
      isValidationOk = this.validate(this.state.partnerName, "maxLength", "showAlert2", { value: 65 });
    }
    if (isValidationOk) {
      isValidationOk = this.validate(this.state.partnerAccountNumber, "required", "showAlert3");
    }
    if (isValidationOk) {
      isValidationOk = this.validate(this.state.partnerAccountNumber, "validBankAccountNumber", "showAlert3");
    }
    if (isValidationOk) {
      isValidationOk = this.validate(this.state.amount, "required", "showAlert4");
    }
    if (isValidationOk) {
      isValidationOk = this.validate(this.state.amount, "lessThanZero", "showAlert4");
    }
    if (isValidationOk) {
      this.startQuery();
    }
  };

  startQuery = async (e) => {
    const data = {
      id_user: this.props.id,
      id_bank_account_number: this.state.sourceAccountNumberId,
      name: this.state.name,
      currency: this.state.currency,
      amount: this.state.amount,
      partner_name: this.state.partnerName,
      partner_account_number: this.state.partnerAccountNumber,
      comment: this.state.comment,
      frequency: this.state.frequency,
      days: this.state.days,
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
    this.setState({ buttonsAreDisabled: true });
    const fetchedData = await this.context.createRecurringTransfer(data, this.props.token).then();
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(this.props);
    } else if (!fetchedData["error"]) {
      this.setState({ validationResponse: "Sikeres rögzítés!" });
      this.setState({ alert5Color: "success" });
      this.setState({ showAlert5: true });
      this.setState({ isError: false });
      if (this.state.isChecked) {
        const data2 = {
          id_user: this.props.id,
          name: this.state.name,
          partner_name: this.state.partnerName,
          partner_account_number: this.state.partnerAccountNumber,
        };
        this.context.createBeneficiary(data2, this.props.token).then();
      }
    } else {
      this.setState({ validationResponse: fetchedData["error"] });
      this.setState({ alert5Color: "danger" });
      this.setState({ showAlert5: true });
      this.setState({ isError: true });
    }
  };

  render() {
    return (
      <Fragment>
        <BreadCrumbs
          data={[
            { name: "Netbank", link: "/attekintes" },
            { name: "Állandó megbízások", link: "/allandomegbizasok" },
            { name: "Új állandó megbízás", link: "" },
          ]}
        />
        <div className="dashboard">
          <Row>
            <Col lg="12">
              <Card className="card netbank-card">
                <Card.Body className="card-body pb-0">
                  <div className="d-flex flex-row">
                    <div className="card-icon d-flex align-items-center justify-content-center">
                      <i className="bi bi-arrow-clockwise"></i>+
                    </div>
                    <h5 className="card-title">Új állandó megbízás</h5>
                  </div>
                  <form className="row g-2 netbank-form">
                    <div className="col-md-12 form-item">
                      <label htmlFor="selectSourceAccountNumber" className="form-label first-label">
                        Forrásszámla
                      </label>
                      <select
                        id="selectSourceAccountNumber"
                        onChange={this.handleSelectSourceAccountNumber}
                        className="form-select"
                      >
                        {this.props.accounts.map((a) => (
                          <option key={a.id}>
                            {" "}
                            {translate(a.type)} - {a.number} - {formatAmount(a.balance)} {a.currency}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12 form-item">
                      <label htmlFor="inputName" className="form-label">
                        Állandó megbízás neve
                      </label>
                      <Alert
                        variant="danger"
                        onClose={() => this.setState({ showAlert1: false })}
                        show={this.state.showAlert1}
                        dismissible
                      >
                        {this.state.validationResponse.error}
                      </Alert>
                      <input
                        type="text"
                        onClick={this.handleClick}
                        onChange={this.handleInputName}
                        value={this.state.name}
                        className="form-control"
                        id="inputComment"
                        placeholder="Pl.: Autó törlesztőrészlet "
                      />
                    </div>
                    <div className="col-md-9 form-item">
                      <label htmlFor="inputPartnerName" className="form-label">
                        Kedvezményezett neve
                      </label>
                      <Alert
                        variant="danger"
                        onClose={() => this.setState({ showAlert2: false })}
                        show={this.state.showAlert2}
                        dismissible
                      >
                        {this.state.validationResponse.error}
                      </Alert>
                      <input
                        id="inputPartnerName"
                        onClick={this.handleClick}
                        onChange={this.handleSelectPartner}
                        value={this.state.partnerName}
                        list="dl"
                        className="form-control"
                        onKeyPress={(event) => {
                          if (!/[a-zA-Z. öÖüÜóÓőŐúÚűŰíÍéÉáÁ]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                      <datalist id="dl">
                        {this.state.beneficiaries.map((a) => (
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
                          onClick={this.handleClickCheckBox}
                          onChange={(e) => {}}
                          checked={this.state.isChecked}
                          disabled={this.state.isDisabled}
                          type="checkbox"
                          id="gridCheck1"
                        />
                      </div>
                    </div>
                    <div className="col-12 form-item">
                      <label htmlFor="inputPartnerAccountNumber" className="form-label">
                        Célszámla
                      </label>
                      <Alert
                        variant="danger"
                        onClose={() => this.setState({ showAlert3: false })}
                        show={this.state.showAlert3}
                        dismissible
                      >
                        {this.state.validationResponse.error}
                      </Alert>
                      <input
                        type="text"
                        id="inputPartnerAccountNumber"
                        value={this.state.partnerAccountNumber}
                        onChange={this.handleInputPartnerAccountNumber}
                        onClick={this.handleClick}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        className="form-control"
                        placeholder="00000000-00000000-00000000"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputAmount" className="form-label">
                        Átutalandó összeg
                      </label>
                      <Alert
                        variant="danger"
                        onClose={() => this.setState({ showAlert4: false })}
                        show={this.state.showAlert4}
                        dismissible
                      >
                        {this.state.validationResponse.error}
                      </Alert>
                      <input
                        type="number"
                        onChange={this.handleInputAmount}
                        onClick={this.handleClick}
                        className="form-control"
                        id="inputAmount"
                        value={this.state.amount}
                      />
                    </div>
                    <div className="col-md-2 form-item">
                      <label htmlFor="inputCurrency" className="form-label">
                        Pénznem
                      </label>
                      <input type="text" className="form-control" id="inputCurrency" readOnly value={this.state.currency} />
                    </div>
                    <div className="col-md-6 form-item">
                      <label htmlFor="selectPartnerName" className="form-label">
                        Átutalás gyakorisága
                      </label>
                      <select id="selectPartnerName" onChange={this.handleSelectFrequency} className="form-select">
                        <option defaultValue>Minden nap</option>
                        <option>Minden hét</option>
                        <option>Minden hónap</option>
                      </select>
                    </div>
                    <div className="col-md-6 form-item">
                      <label htmlFor="selectPartnerName" className="form-label">
                        Ismétlődés
                      </label>
                      <select
                        disabled={this.state.isSelectDisabled}
                        id="selectPartnerName"
                        onChange={this.handleSelectDays}
                        className="form-select"
                      >
                        {this.state.actualOptions.map((a) => (
                          <option key={a.recurring_transfer_id}>{a}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12 form-item">
                      <label htmlFor="inputComment" className="form-label">
                        Közlemény
                      </label>
                      <input
                        type="text"
                        onChange={this.handleInputComment}
                        className="form-control"
                        value={this.state.comment}
                        id="inputComment"
                        placeholder="2022/021 számla"
                      />
                    </div>
                    <Alert variant={this.state.alert5Color} onClose={this.handleClick} show={this.state.showAlert5} dismissible>
                      {this.state.validationResponse}
                    </Alert>
                    <div className="text-center form-item">
                      <button
                        onClick={this.handleSubmit}
                        disabled={this.state.buttonsAreDisabled}
                        type="submit"
                        className="btn btn-success form-button"
                      >
                        Mentés
                      </button>
                      <Link
                        to="/allandomegbizasok"
                        disabled={this.state.buttonsAreDisabled}
                        className={this.state.buttonsAreDisabled ? "btn btn-secondary disabled" : "btn btn-secondary"}
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
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = {
  tryToLogout,
  showLoggedOutModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRecurringTransfer);

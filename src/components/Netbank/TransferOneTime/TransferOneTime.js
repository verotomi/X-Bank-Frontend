import { ApiContext } from "../../../api/ApiProvider";
import { connect } from "react-redux";
import { evaluate, formatAmount } from "../../../assets/script/scripts";
import { Link } from "react-router-dom";
import { Row, Col, Card, Alert } from "react-bootstrap";
import { sessionExpired, translate } from "../../../assets/script/scripts";
import { transferOneTime } from "../../../actions/actions";
import { tryToLogout, showLoggedOutModal, updateAccountsAction } from "../../../actions/actions";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import React, { Fragment } from "react";

class TransferOneTime extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      alert4Color: "danger",
      amount: "",
      beneficiaries: [],
      buttonsAreDisabled: false,
      comment: "",
      currency: "",
      isChecked: false,
      isDisabled: false,
      isError: false,
      partnerAccountNumber: "",
      partnerName: "",
      previousPartnerAccountNumber: "",
      showAlert1: false,
      showAlert2: false,
      showAlert3: false,
      showAlert4: false,
      sourceAccountNumberId: 1,
      validationResponse: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickCheckBox = this.handleClickCheckBox.bind(this);
    this.handleInputAmount = this.handleInputAmount.bind(this);
    this.handleInputComment = this.handleInputComment.bind(this);
    this.handleInputPartnerAccountNumber = this.handleInputPartnerAccountNumber.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleInputComment(e) {
    const x = String(e.target.value);
    if (x.length < 97) {
      this.setState({ comment: e.target.value });
    }
  }

  handleInputPartnerAccountNumber(e) {
    const x = String(e.target.value);
    if (x.length < 27) {
      this.setState({ previousPartnerAccountNumber: this.state.partnerAccountNumber });
      if (
        (x.length === 9 && this.state.previousPartnerAccountNumber.length < 8) ||
        (x.length === 18 && this.state.previousPartnerAccountNumber.length < 17)
      ) {
        const text1 = e.target.value.slice(0, e.target.value.length - 1);
        const text2 = e.target.value.slice(e.target.value.length - 1);
        this.setState({ partnerAccountNumber: text1 + "-" + text2 });
      } else if (
        (x.length === 9 && this.state.previousPartnerAccountNumber.length > 9) ||
        (x.length === 18 && this.state.previousPartnerAccountNumber.length > 18)
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

  componentDidMount() {
    this.setState({ sourceAccountNumberId: this.props.accounts[0].id });
    this.context.getBeneficiaries(this.props.id, this.props.token).then((beneficiaries) => {
      this.setState({ ...this.state, beneficiaries: beneficiaries });
    });
    this.setState({ currency: this.props.accounts[0].currency });
  }

  handleClickCheckBox() {
    this.setState({ isChecked: !this.state.isChecked });
  }

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

  handleClick() {
    if (!this.state.isError && this.state.showAlert4) {
      this.setState({ partnerName: "" });
      this.setState({ partnerAccountNumber: "" });
      this.setState({ amount: "" });
      this.setState({ comment: "" });
    }
    this.setState({ showAlert1: false });
    this.setState({ showAlert2: false });
    this.setState({ showAlert3: false });
    this.setState({ showAlert4: false });
    this.setState({ buttonsAreDisabled: false });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let isValidationOk = true;
    this.setState({
      showAlert1: false,
      showAlert2: false,
      showAlert3: false,
      showAlert4: false,
    });
    isValidationOk = this.validate(this.state.partnerName, "required", "showAlert1");
    if (isValidationOk) {
      isValidationOk = this.validate(this.state.partnerName, "maxLength", "showAlert1", { value: 65 });
    }
    if (isValidationOk) {
      isValidationOk = this.validate(this.state.partnerAccountNumber, "required", "showAlert2");
    }
    if (isValidationOk) {
      isValidationOk = this.validate(this.state.partnerAccountNumber, "validBankAccountNumber", "showAlert2");
    }
    if (isValidationOk) {
      isValidationOk = this.validate(this.state.amount, "required", "showAlert3");
    }
    if (isValidationOk) {
      isValidationOk = this.validate(this.state.amount, "lessThanZero", "showAlert3");
    }
    if (isValidationOk) {
      this.startQuery();
    }
  };

  startQuery = async (e) => {
    this.setState({ buttonsAreDisabled: true });
    const data = {
      id_user: this.props.id, 
      currency: this.state.currency,
      id_bank_account_number: this.state.sourceAccountNumberId,
      amount: this.state.amount,
      partner_name: this.state.partnerName,
      partner_account_number: this.state.partnerAccountNumber,
      comment: this.state.comment,
    };
    const fetchedData = await this.context.createOneTimeTransfer(data, this.props.token);
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(this.props);
    } else if (!fetchedData["error"]) {
      this.setState({ validationResponse: "Az átutalás sikeresen megtörtént!" });
      this.setState({ alert4Color: "success" });
      this.setState({ showAlert4: true });
      this.setState({ isError: false });
      if (this.state.isChecked) {
        const data2 = {
          id_user: this.props.id,
          name: this.state.partnerName,
          partner_name: this.state.partnerName,
          partner_account_number: this.state.partnerAccountNumber,
        };
        this.context.createBeneficiary(data2, this.props.token).then();
      }
      this.context.getAccountBalances(this.props.id, this.props.token).then((accounts) => {
        this.setState({ ...this.state, accounts: accounts });
        this.props.updateAccountsAction(accounts);
      });
    } else {
      this.setState({ validationResponse: fetchedData["error"] });
      this.setState({ alert4Color: "danger" });
      this.setState({ showAlert4: true });
      this.setState({ isError: true });
    }
  };

  render() {
    return (
      <Fragment>
        <BreadCrumbs
          data={[
            { name: "Netbank", link: "/" },
            { name: "Egyszeri átutalás", link: "" },
          ]}
        />
        <div className="dashboard">
          <Row>
            <Col lg="12">
              <Card className="card netbank-card">
                <Card.Body className="card-body pb-0">
                  <div className="d-flex flex-row">
                    <div className="card-icon d-flex align-items-center justify-content-center">
                      <i className="bi bi-forward"></i>
                    </div>
                    <h5 className="card-title">Egyszeri átutalás</h5>
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
                    <div className="col-md-9 form-item">
                      <label htmlFor="selectPartnerName" className="form-label">
                        Kedvezményezett neve
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
                        id="selectPartnerName"
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
                      <label className="form-check form-check-label" htmlFor="gridCheck1">
                        Kedvezményezett mentése
                      </label>
                      <div className="mx-auto mt-2" style={{ textAlign: "center" }}>
                        <input
                          className="form-check-input"
                          onClick={this.handleClickCheckBox}
                          onChange={(e) => {}} // enélkül Warning van a console-on
                          checked={this.state.isChecked}
                          disabled={this.state.isDisabled}
                          type="checkbox"
                          id="gridCheck1"
                        />
                      </div>
                    </div>
                    <div className="col-12 form-item">
                      <label htmlFor="inputPartnerAccountNumber" className="form-label">
                        Célszámla száma
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
                        type="text"
                        onChange={this.handleInputPartnerAccountNumber}
                        onClick={this.handleClick}
                        value={this.state.partnerAccountNumber}
                        className="form-control"
                        id="inputPartnerAccountNumber"
                        placeholder="00000000-00000000-00000000"
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputAmount" className="form-label">
                        Átutalandó összeg
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
                        type="number"
                        onChange={this.handleInputAmount}
                        onClick={this.handleClick}
                        value={this.state.amount}
                        className="form-control"
                        id="inputAmount"
                      />
                    </div>
                    <div className="col-md-2 form-item">
                      <label htmlFor="inputCurrency" className="form-label">
                        Pénznem
                      </label>
                      <input type="text" className="form-control" id="inputCurrency" readOnly value={this.state.currency} />
                    </div>
                    <div className="col-12 form-item">
                      <label htmlFor="inputComment" className="form-label">
                        Közlemény
                      </label>
                      <input
                        type="text"
                        onChange={this.handleInputComment}
                        className="form-control"
                        id="inputComment"
                        value={this.state.comment}
                        placeholder="2022/021 számla"
                      />
                    </div>
                    <Alert variant={this.state.alert4Color} onClose={this.handleClick} show={this.state.showAlert4} dismissible>
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
                        to="/attekintes"
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

const mapDispatchToProps = {
  transferOneTime,
  tryToLogout,
  showLoggedOutModal,
  updateAccountsAction,
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferOneTime);

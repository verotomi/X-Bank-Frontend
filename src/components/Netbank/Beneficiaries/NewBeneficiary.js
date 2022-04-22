import { Alert } from "react-bootstrap";
import { ApiContext } from "../../../api/ApiProvider";
import { connect } from "react-redux";
import { evaluate, sessionExpired } from "../../../assets/script/scripts";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { tryToLogout, showLoggedOutModal } from "../../../actions/actions";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import React, { Fragment } from "react";

class NewBeneficiary extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      partnerName: "",
      partnerAccountNumber: "",
      validationResponse: "",
      showAlert1: false,
      showAlert2: false,
      showAlert3: false,
      showAlert4: false,
      alert4Color: "danger",
      isError: false,
      buttonsAreDisabled: false,
      previousPartnerAccountNumber: "",
    };
    this.validate = this.validate.bind(this);
    this.handleInputPartnerAccountNumber = this.handleInputPartnerAccountNumber.bind(this);
    this.handleAlert4Close = this.handleAlert4Close.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

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

  handleAlert4Close() {
    this.setState({ showAlert4: false });
    this.setState({ buttonsAreDisabled: false });
    if (!this.state.isError && this.state.showAlert4) {
      this.setState({ name: "" });
      this.setState({ partnerName: "" });
      this.setState({ partnerAccountNumber: "" });
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

  handleSubmit = (e) => {
    e.preventDefault();
    let isValidationOk = true;
    this.setState({
      showAlert1: false,
      showAlert2: false,
      showAlert3: false,
      showAlert4: false,
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
      this.startQuery();
    }
  };

  handleClick() {
    if (!this.state.isError && this.state.showAlert4) {
      this.setState({ name: "" });
      this.setState({ partnerName: "" });
      this.setState({ partnerAccountNumber: "" });
    }
    this.setState({ showAlert1: false });
    this.setState({ showAlert2: false });
    this.setState({ showAlert3: false });
    this.setState({ showAlert4: false });
    this.setState({ buttonsAreDisabled: false });
  }

  startQuery = async (e) => {
    const data = {
      id_user: this.props.id,
      name: this.state.name,
      partner_name: this.state.partnerName,
      partner_account_number: this.state.partnerAccountNumber,
    };
    this.setState({ buttonsAreDisabled: true });
    const fetchedData = await this.context.createBeneficiary(data, this.props.token).then();
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(this.props);
    } else if (!fetchedData["error"]) {
      this.setState({ validationResponse: "Sikeres rögzítés" });
      this.setState({ alert4Color: "success" });
      this.setState({ showAlert4: true });
      this.setState({ isError: false });
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
            { name: "Netbank", link: "/attekintes" },
            { name: "Kedvezményezettek", link: "/kedvezmenyezettek" },
            { name: "Új kedvezményezett", link: "" },
          ]}
        />
        <div className="dashboard">
          <Row>
            <Col lg="12">
              <Card className="card netbank-card">
                <Card.Body className="card-body pb-0">
                  <div className="d-flex flex-row">
                    <div className="card-icon d-flex align-items-center justify-content-center">
                      <i className="bi bi-person-plus"></i>
                    </div>
                    <h5 className="card-title">Új kedvezményezett rögzítése</h5>
                  </div>
                  <form className="row g-2 netbank-form">
                    <div className="col-12 form-item">
                      <label htmlFor="inputTemplateName" className="form-label first-label">
                        Sablon neve
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
                        onChange={(e) => this.setState({ name: e.target.value })}
                        value={this.state.name}
                        className="form-control"
                        id="inputTemplateName"
                        placeholder="sablon neve"
                      />
                    </div>
                    <div className="col-12 form-item">
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
                        type="text"
                        onClick={this.handleClick}
                        onChange={(e) => this.setState({ partnerName: e.target.value })}
                        onKeyPress={(event) => {
                          if (!/[a-zA-Z. öÖüÜóÓőŐúÚűŰíÍéÉáÁ]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={this.state.partnerName}
                        className="form-control"
                        id="inputPartnerName"
                        placeholder="partner neve"
                      />
                    </div>
                    <div className="col-12 form-item">
                      <label htmlFor="inputTargetAccountNumber" className="form-label">
                        Célszámla száma
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
                        onChange={this.handleInputPartnerAccountNumber}
                        onClick={this.handleClick}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={this.state.partnerAccountNumber}
                        className="form-control"
                        id="inputTargetAccountNumber"
                        placeholder="00000000-00000000-00000000"
                      />
                    </div>
                    <Alert
                      variant={this.state.alert4Color}
                      onClose={this.handleAlert4Close}
                      show={this.state.showAlert4}
                      dismissible
                    >
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

function withNavigate(WrappedComponent) {
  return (props) => {
    const navigate = useNavigate();
    return <WrappedComponent navigate={navigate} {...props} />;
  };
}

const mapDispatchToProps = {
  tryToLogout,
  showLoggedOutModal,
};

export default withNavigate(connect(mapStateToProps, mapDispatchToProps)(NewBeneficiary));

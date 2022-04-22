import { ApiContext } from "../../../api/ApiProvider";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Card, Alert } from "react-bootstrap";
import { translate, evaluate, formatAmount } from "../../../assets/script/scripts";
import { updateAccountsAction } from "../../../actions/actions";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import React, { Fragment } from "react";

class NewSaving extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      alert4Color: "danger",
      amount: "",
      buttonsAreDisabled: false,
      currency: "",
      duration: 0,
      isError: false,
      saving_type_id: 0,
      savingTypes: [],
      showAlert1: false,
      showAlert2: false,
      sourceAccountNumberId: 0,
      validationResponse: "",
    };
    this.handleInputAmount = this.handleInputAmount.bind(this);
    this.validate = this.validate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAlert2Close = this.handleAlert2Close.bind(this);
  }

  componentDidMount() {
    this.context.getSavingTypes(this.props.token).then((savingTypes) => {
      this.setState({ ...this.state, savingTypes: savingTypes });
      this.setState({ saving_type_id: savingTypes[0].id });
      this.setState({ duration: savingTypes[0].duration });
      this.setState({ currency: this.props.accounts[0].currency });
    });
    this.setState({ sourceAccountNumberId: this.props.accounts[0].id });
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

  handleInputAmount(e) {
    this.setState({ amount: e.target.value });
  }

  handleAlert2Close() {
    if (!this.state.isError && this.state.showAlert2) {
      this.setState({ amount: "" });
    }
    this.setState({ showAlert2: false });
    this.setState({ buttonsAreDisabled: false });
  }

  handleClick() {
    if (!this.state.isError && this.state.showAlert2) {
      this.setState({ amount: "" });
    }
    this.setState({ showAlert1: false });
    this.setState({ showAlert2: false });
    this.setState({ buttonsAreDisabled: false });
  }

  handleSelectType = (e) => {
    this.setState({ saving_type_id: this.state.savingTypes[e.currentTarget.selectedIndex].id });
    this.setState({ duration: this.state.savingTypes[e.currentTarget.selectedIndex].duration });
    this.setState({
      showAlert1: false,
      showAlert2: false,
    });
    this.setState({ buttonsAreDisabled: false });
  };

  handleSelectSourceAccountNumber = (e) => {
    this.setState({ sourceAccountNumberId: this.props.accounts[e.currentTarget.selectedIndex].id });
    this.setState({ currency: this.props.accounts[e.currentTarget.selectedIndex].currency });
    this.setState({
      showAlert1: false,
      showAlert2: false,
    });
    this.setState({ buttonsAreDisabled: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let isValidationOk = true;
    this.setState({
      showAlert1: false,
      showAlert2: false,
    });
    isValidationOk = this.validate(this.state.amount, "required", "showAlert1");
    if (isValidationOk) {
      isValidationOk = this.validate(this.state.amount, "lessThanZero", "showAlert1");
    }
    if (isValidationOk) {
      this.startQuery();
    }
  };

  startQuery = async (e) => {
    const data = {
      id_user: this.props.id,
      id_bank_account: this.state.sourceAccountNumberId,
      id_type: this.state.saving_type_id,
      amount: this.state.amount,
      duration: parseInt(this.state.duration),
    };
    this.setState({ buttonsAreDisabled: true });
    const fetchedData = await this.context.createNewSaving(data, this.props.token).then();
    if (!fetchedData["error"]) {
      this.setState({ validationResponse: "Sikeres rögzítés" });
      this.setState({ alert2Color: "success" });
      this.setState({ showAlert2: true });
      this.setState({ isError: false });
      this.context.getAccountBalances(this.props.id, this.props.token).then((accounts) => {
        this.setState({ ...this.state, accounts: accounts });
        this.props.updateAccountsAction(accounts);
      });
    } else {
      this.setState({ validationResponse: fetchedData["error"] });
      this.setState({ alert2Color: "danger" });
      this.setState({ showAlert2: true });
      this.setState({ isError: true });
    }
  };

  render() {
    return (
      <Fragment>
        <BreadCrumbs
          data={[
            { name: "Netbank", link: "/attekintes" },
            { name: "Megtakarítások", link: "/megtakaritasok" },
            { name: "Új megtakarítás rögzítése", link: "" },
          ]}
        />
        <div className="dashboard">
          <Row>
            <Col lg="12">
              <Card className="card netbank-card">
                <Card.Body className="card-body pb-0">
                  <div className="d-flex flex-row">
                    <div className="card-icon d-flex align-items-center justify-content-center">
                      <i className="bi bi-piggy-bank"></i>+
                    </div>
                    <h5 className="card-title">Új megtakarítás rögzítése</h5>
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
                      <label htmlFor="selectPartnerName" className="form-label">
                        Megtakarítás típusa
                      </label>
                      <select id="selectPartnerName" onChange={this.handleSelectType} className="form-select">
                        {this.state.savingTypes
                          .filter((x) => x.currency === this.state.currency)
                          .map((a) => (
                            <option key={a.id}>
                              {" "}
                              {translate(a.type)} - {a.rate}% - {a.duration} nap
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputAmount" className="form-label">
                        Lekötött összeg
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
                        type="number"
                        onChange={(e) => this.setState({ amount: e.target.value })}
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
                    <Alert
                      variant={this.state.alert2Color}
                      onClose={this.handleAlert2Close}
                      show={this.state.showAlert2}
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

const mapDispatchToProps = {
  updateAccountsAction,
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSaving);

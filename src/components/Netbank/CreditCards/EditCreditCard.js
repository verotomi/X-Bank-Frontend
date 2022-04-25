import { ApiContext } from "../../../api/ApiProvider";
import { connect } from "react-redux";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { toggleEditCreditCardComponent } from "../../../actions/actions";
import { translate, formatCreditcardNumber, formatAmount, sessionExpired } from "../../../assets/script/scripts";
import { tryToLogout, showLoggedOutModal } from "../../../actions/actions";
import React, { Fragment } from "react";

/**
 * Egy bankkártya adatainak a módosítása
 */
class EditCreditCard extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      alert1Color: "danger",
      button1IsDisabled: true,
      button2IsDisabled: false,
      creditCards: [],
      currency: "Forint",
      id_bank_account: 1,
      isDisabled: false,
      isSwitchActive: false,
      selectSourceAccountValue: "",
      showAlert1: false,
      sliderMax: 0,
      sliderMin: 0,
      sliderStep: 0,
      sourceAccountNumberId: 1,
      token: "",
      validationResponse: "",
      valueAtm: 10000,
      valueOnline: 10000,
      valuePos: 10000,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleAlert1Close = this.handleAlert1Close.bind(this);
    this.handleChangeAtm = this.handleChangeAtm.bind(this);
    this.handleChangeOnline = this.handleChangeOnline.bind(this);
    this.handleChangePos = this.handleChangePos.bind(this);
    this.handleSelectSourceAccountNumber = this.handleSelectSourceAccountNumber.bind(this);
    this.handleSubmitCancel = this.handleSubmitCancel.bind(this);
    this.handleSubmitModify = this.handleSubmitModify.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.state.selectSourceAccountValue = this.props.selectorDefaultValue;
  }

  handleAlert1Close() {
    this.setState({ showAlert1: false });
    this.setState({ button1IsDisabled: false });
    this.setState({ button2IsDisabled: false });
    this.setState({ isDisabled: false });
  }

  handleSelectSourceAccountNumber(e) {
    this.setState({ button1IsDisabled: false });
    this.setState({ sourceAccountNumberId: this.props.accounts[e.currentTarget.selectedIndex].id });
    this.setState({ currency: this.props.accounts[e.currentTarget.selectedIndex].currency });
    if (this.props.accounts[e.currentTarget.selectedIndex].currency === "Euro" && this.state.currency !== "Euro") {
      this.setState({ sliderMin: 50 });
      this.setState({ sliderMax: 2000 });
      this.setState({ sliderStep: 50 });
      this.setState({ valueAtm: 50 });
      this.setState({ valuePos: 50 });
      this.setState({ valueOnline: 50 });
    } else if (this.props.accounts[e.currentTarget.selectedIndex].currency === "Forint" && this.state.currency !== "Forint") {
      this.setState({ sliderMin: 10000 });
      this.setState({ sliderMax: 500000 });
      this.setState({ sliderStep: 10000 });
      this.setState({ valueAtm: 10000 });
      this.setState({ valuePos: 10000 });
      this.setState({ valueOnline: 10000 });
    }
  }

  handleSwitchChange(e) {
    this.setState({ button1IsDisabled: false });
    this.setState({ isSwitchActive: !this.state.isSwitchActive });
  }

  handleChangeAtm(e) {
    this.setState({ button1IsDisabled: false });
    this.setState({ valueAtm: e.target.value });
  }

  handleChangePos(e) {
    this.setState({ button1IsDisabled: false });
    this.setState({ valuePos: e.target.value });
  }

  handleChangeOnline(e) {
    this.setState({ button1IsDisabled: false });
    this.setState({ valueOnline: e.target.value });
  }

  handleSubmitCancel(e) {
    e.preventDefault();
    this.props.toggleEditCreditCardComponent();
  }

  handleSubmitModify = async (e) => {
    e.preventDefault();
    this.setState({ isDisabled: true });
    const data = {
      id: this.props.creditCard.creditcard_id,
      status: this.state.isSwitchActive ? "Active" : "Inactive",
      limit_atm: this.state.valueAtm,
      limit_pos: this.state.valuePos,
      limit_online: this.state.valueOnline,
      id_bank_account: this.state.sourceAccountNumberId,
      id_user: this.props.id,
    };
    const fetchedData = await this.context.updateCreditCard(data, this.props.token);
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(this.props);
    } else if (!fetchedData["error"]) {
      this.setState({ validationResponse: "A módosítás sikeresen megtörtént!" });
      this.setState({ alert1Color: "success" });
      this.setState({ showAlert1: true });
      this.setState({ button1IsDisabled: true });
      this.setState({ button2IsDisabled: true });
      this.setState({ isError: false });
      this.setState({ creditCards: fetchedData });
      this.props.updateCreditcards(fetchedData);
    } else {
      this.setState({ validationResponse: fetchedData["error"] });
      this.setState({ alert1Color: "danger" });
      this.setState({ showAlert1: true });
      this.setState({ isError: true });
      this.setState({ button1IsDisabled: true });
      this.setState({ button2IsDisabled: true });
    }
  };

  componentDidMount() {
    this.setState({ id_bank_account: this.props.creditCard.id_bank_account });
    this.setState({ valueAtm: this.props.creditCard.limit_atm });
    this.setState({ valuePos: this.props.creditCard.limit_pos });
    this.setState({ valueOnline: this.props.creditCard.limit_online });
    this.setState({ isSwitchActive: this.props.creditCard.credit_card_status === "Active" ? true : false });
    this.setState({ sliderMin: this.props.creditCard.currency === "Forint" ? 10000 : 50 });
    this.setState({ sliderMax: this.props.creditCard.currency === "Forint" ? 500000 : 2000 });
    this.setState({ sliderStep: this.props.creditCard.currency === "Forint" ? 10000 : 50 });
    this.setState({ currency: this.props.creditCard.currency });
  }

  render() {
    return (<Fragment>
      {this.props.creditCard && <Fragment>
      <div id="credit-card-details">
          <h5 className="card-title">
            {this.props.creditCard.creditcard_number.charAt(0) === 5 ? "Az" : "A"}{" "}
            {formatCreditcardNumber(this.props.creditCard.creditcard_number)} számú kártya kezelése:
          </h5>
        </div>
        <Row>
          <Col lg="12">
            <form className="row g-2 netbank-form">
              <div className="col-md-2 form-item">
                <label className="first-label" htmlFor="gridCheck1">
                  A kártya állapota
                </label>
                <div className="form-switch mx-auto mt-2" style={{ textAlign: "center" }}>
                  <input
                    className="form-check-input"
                    onChange={this.handleSwitchChange}
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    checked={this.state.isSwitchActive}
                    disabled={this.state.isDisabled}
                  />
                  <span className="default-cursor" onClick={this.handleSwitchChange}>
                    {this.state.isSwitchActive ? " Aktív " : " Inaktív "}
                  </span>
                </div>
              </div>
              <div className="col-md-7 form-item">
                <label htmlFor="selectSourceAccountNumber" className="form-label first-label">
                  Kapcsolódó folyószámla
                </label>
                <select
                  id="selectSourceAccountNumber"
                  onChange={this.handleSelectSourceAccountNumber}
                  defaultValue={this.state.selectSourceAccountValue}
                  className="form-select"
                  disabled={this.state.isDisabled}
                >
                  {this.props.accounts.map((a) => (
                    <option key={a.id}>
                      {translate(a.type)} - {a.number} - {formatAmount(a.balance)} {a.currency}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-9 form-item">
                <label className="form-check first-label">Limitek:</label>
                <div className="mx-auto mt-2 px-5" style={{ textAlign: "center" }}>
                  <div>
                    <p className="form-label">
                      Bankautomata: {this.state.valueAtm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {this.state.currency}
                    </p>
                    <input
                      type="range"
                      onInput={this.handleChangeAtm}
                      className="form-range"
                      min={this.state.sliderMin}
                      max={this.state.sliderMax}
                      step={this.state.sliderStep}
                      value={this.state.valueAtm}
                      id="customRange1"
                      disabled={this.state.isDisabled}
                    />
                  </div>
                  <div>
                    <p className="form-label">
                      Vásárlás: {this.state.valuePos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {this.state.currency}
                    </p>
                    <input
                      type="range"
                      onInput={this.handleChangePos}
                      className="form-range"
                      min={this.state.sliderMin}
                      max={this.state.sliderMax}
                      step={this.state.sliderStep}
                      value={this.state.valuePos}
                      disabled={this.state.isDisabled}
                      id="customRange2"
                    />
                  </div>
                  <div>
                    <p className="form-label">
                      Online vásárlás: {this.state.valueOnline.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      {this.state.currency}
                    </p>
                    <input
                      type="range"
                      onInput={this.handleChangeOnline}
                      className="form-range"
                      min={this.state.sliderMin}
                      max={this.state.sliderMax}
                      step={this.state.sliderStep}
                      value={this.state.valueOnline}
                      id="customRange3"
                      disabled={this.state.isDisabled}
                    />
                  </div>
                  <div></div>
                </div>
              </div>
              <Alert variant={this.state.alert1Color} onClose={this.handleAlert1Close} show={this.state.showAlert1} dismissible>
                {this.state.validationResponse}
              </Alert>
              <div className="text-center form-item">
                <Button
                  onClick={this.handleSubmitModify}
                  disabled={this.state.button1IsDisabled}
                  type="submit"
                  className="btn btn-success form-button"
                >
                  Módosít
                </Button>
                <Button
                  onClick={this.handleSubmitCancel}
                  disabled={this.state.button2IsDisabled}
                  type="submit"
                  className="btn btn-secondary form-button"
                >
                  Mégsem
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Fragment>}</Fragment>
    );
  }
}

const mapDispatchToProps = {
  toggleEditCreditCardComponent,
  tryToLogout,
  showLoggedOutModal,
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCreditCard);

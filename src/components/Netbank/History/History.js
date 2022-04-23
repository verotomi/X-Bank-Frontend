import { ApiContext } from "../../../api/ApiProvider";
import { connect } from "react-redux";
import { Row, Col, Table, Card } from "react-bootstrap";
import { showLoggedOutModal } from "../../../actions/actions";
import { translate, formatAmount, sessionExpired } from "../../../assets/script/scripts";
import { tryToLogout } from "../../../actions/actions";
import * as constantsClass from "../../../assets/constant/constants";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import React, { Fragment } from "react";
import TableHeadHistory from "./TableHeadHistory";
import TableRowHistory from "./TableRowHistory";

/**
 * Megjeleníti a számlatörténetet
 */
class History extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      accountNumberId: this.props.accounts[0].id,
      history: [],
      currency: "",
      saving_type_id: 0,
      duration: 0,
      direction: "all",
      isSwitch1Checked: true,
      isSwitch2Checked: true,
      from: "",
      to: "",
      loadingText: "",
      loadingTextClass: "loading",
      sortIconTableHead1: "bi bi-caret-down-fill",
      sortIconTableHead2: "bi bi-chevron-expand",
      sortIconTableHead3: "bi bi-chevron-expand",
      sortIconTableHead4: "bi bi-chevron-expand",
      sortIconTableHead5: "bi bi-chevron-expand",
      sortValue: "",
      sortDirection: "ascending",
    };
    this.handleSwitch1Change = this.handleSwitch1Change.bind(this);
    this.handleSwitch2Change = this.handleSwitch2Change.bind(this);
    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleSortChange(value, direction, array) {
    let temporaryArray = array == null ? this.state.history : array.slice();
    switch (value) {
      case "Dátum / Idő":
        direction =
          direction == null
            ? this.state.sortIconTableHead1 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead1: "bi bi-caret-up-fill" });
          temporaryArray.sort(function (a, b) {
            return a.arrived_on > b.arrived_on ? -1 : 1;
          });
        } else if (direction === "descending" || this.state.sortIconTableHead1 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead1: "bi bi-caret-down-fill" });
          temporaryArray.sort(function (a, b) {
            return a.arrived_on > b.arrived_on ? 1 : -1;
          });
        }
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead4: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead5: "bi bi-chevron-expand" });
        break;
      case "Tranzakció típusa":
        direction =
          direction == null
            ? this.state.sortIconTableHead2 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead2: "bi bi-caret-up-fill" });
          temporaryArray.sort(function (a, b) {
            if (translate(a.transaction_type) === translate(b.transaction_type)) {
              return b.arrived_on.localeCompare(a.arrived_on);
            }
            return translate(b.transaction_type).localeCompare(translate(a.transaction_type));
          });
        } else if (direction === "descending" || this.state.sortIconTableHead2 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead2: "bi bi-caret-down-fill" });
          temporaryArray.sort(function (a, b) {
            if (translate(a.transaction_type) === translate(b.transaction_type)) {
              return b.arrived_on.localeCompare(a.account_statements_numarrived_onber);
            }
            return translate(a.transaction_type).localeCompare(translate(b.transaction_type));
          });
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead4: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead5: "bi bi-chevron-expand" });
        break;
      case "Partner":
        direction =
          direction == null
            ? this.state.sortIconTableHead3 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead3: "bi bi-caret-up-fill" });
          temporaryArray.sort(function (a, b) {
            if (a.partner_name == null) {
              a.partner_name = "";
            }
            if (b.partner_name == null) {
              b.partner_name = "";
            }
            if (a.partner_name === b.partner_name) {
              return b.arrived_on.localeCompare(a.arrived_on);
            }
            return b.partner_name.localeCompare(a.partner_name);
          });
        } else if (direction === "descending" || this.state.sortIconTableHead3 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead3: "bi bi-caret-down-fill" });
          temporaryArray.sort(function (a, b) {
            if (a.partner_name == null) {
              a.partner_name = "";
            }
            if (b.partner_name == null) {
              b.partner_name = "";
            }
            if (a.partner_name === b.partner_name) {
              return b.arrived_on.localeCompare(a.arrived_on);
            }
            return a.partner_name.localeCompare(b.partner_name);
          });
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead4: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead5: "bi bi-chevron-expand" });
        break;
      case "Közlemény":
        direction =
          direction == null
            ? this.state.sortIconTableHead4 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead4: "bi bi-caret-up-fill" });
          temporaryArray.sort(function (a, b) {
            if (translate(a.comment) === translate(b.comment)) {
              return b.arrived_on.localeCompare(a.arrived_on);
            }
            return translate(b.comment).localeCompare(translate(a.comment));
          });
        } else if (direction === "descending" || this.state.sortIconTableHead4 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead4: "bi bi-caret-down-fill" });
          temporaryArray.sort(function (a, b) {
            if (translate(a.comment) === translate(b.comment)) {
              return b.arrived_on.localeCompare(a.arrived_on);
            }
            return translate(a.comment).localeCompare(translate(b.comment));
          });
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead5: "bi bi-chevron-expand" });
        break;
      case "Összeg":
        direction =
          direction == null
            ? this.state.sortIconTableHead5 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead5: "bi bi-caret-up-fill" });
          temporaryArray.sort(function (a, b) {
            if (parseInt(a.amount) === parseInt(b.amount)) {
              return a.expire_date > b.expire_date ? 1 : -1;
            }
            return parseInt(a.amount) > parseInt(b.amount) ? -1 : 1;
          });
        } else if (direction === "descending" || this.state.sortIconTableHead4 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead5: "bi bi-caret-down-fill" });
          temporaryArray.sort(function (a, b) {
            if (parseInt(a.amount) === parseInt(b.amount)) {
              return a.expire_date > b.expire_date ? 1 : -1;
            }
            return parseInt(a.amount) > parseInt(b.amount) ? 1 : -1;
          });
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead4: "bi bi-chevron-expand" });
        break;
      default:
        temporaryArray = array;
        break;
    }
    this.setState({ history: temporaryArray });
    this.setState({ sortDirection: direction });
    this.setState({ sortValue: value });
    if (temporaryArray.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    }
  }

  async componentDidMount() {
    const today = new Date();
    const today2 = new Date();
    today2.setMonth(today2.getMonth() - 1);
    this.setState({ from: today2.toISOString().substring(0, 10) });
    this.setState({ to: today.toISOString().substring(0, 10) });
    const data = {
      id_bank_account_number: this.state.accountNumberId,
      id_user: this.props.id,
      direction: this.state.direction,
      from: today2.toISOString().substring(0, 10) + " 00:00:00",
      to: today.toISOString().substring(0, 10) + " 23:59:59",
    };
    this.setState({ loadingText: constantsClass.TEXT_LOADING });
    const fetchedData = await this.context.getAccountHistory(data, this.props.token);
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(this.props);
    } else if (fetchedData.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    } else if (fetchedData.length > 0) {
      fetchedData.forEach((element) => {
        element.amount = element.direction === "out" ? -element.amount : element.amount;
      });
      this.setState({ history: fetchedData });
    }
  }

  async handleSwitch1Change(e) {
    this.setState({ history: [] });
    this.setState({ loadingText: constantsClass.TEXT_LOADING });
    this.setState({ loadingTextClass: "loading" });
    if (this.state.isSwitch2Checked) {
      this.setState({ isSwitch1Checked: !this.state.isSwitch1Checked });
      if (e.currentTarget.checked && this.state.isSwitch2Checked) {
        this.setState({ direction: "all" });
      } else if (this.state.isSwitch1Checked) {
        this.setState({ direction: "in" });
      } else if (this.state.isSwitch2Checked) {
        this.setState({ direction: "out" });
      }
    } else {
      this.setState({ isSwitch1Checked: false });
      this.setState({ isSwitch2Checked: true });
      this.setState({ direction: "in" });
    }
    const data = {
      id_bank_account_number: this.state.accountNumberId,
      id_user: this.props.id,
      direction: e.currentTarget.checked ? (this.state.isSwitch2Checked ? "all" : "out") : "in",
      from: this.state.from + " 00:00:00",
      to: this.state.to + " 23:59:59",
    };
    const fetchedData = await this.context.getAccountHistory(data, this.props.token);
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(this.props);
    } else if (fetchedData.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    } else if (fetchedData.length > 0) {
      fetchedData.forEach((element) => {
        element.amount = element.direction === "out" ? -element.amount : element.amount;
      });
      this.setState({ history: fetchedData });
    }
    this.handleSortChange(this.state.sortValue, this.state.sortDirection, fetchedData);
  }

  async handleSwitch2Change(e) {
    this.setState({ history: [] });
    this.setState({ loadingText: constantsClass.TEXT_LOADING });
    this.setState({ loadingTextClass: "loading" });
    if (this.state.isSwitch1Checked) {
      this.setState({ isSwitch2Checked: !this.state.isSwitch2Checked });
      if (this.state.isSwitch1Checked && e.currentTarget.checked) {
        this.setState({ direction: "all" });
      } else if (this.state.isSwitch1Checked) {
        this.setState({ direction: "in" });
      } else if (this.state.isSwitch2Checked) {
        this.setState({ direction: "out" });
      }
    } else {
      this.setState({ isSwitch1Checked: true });
      this.setState({ isSwitch2Checked: false });
      this.setState({ direction: "out" });
    }
    const data = {
      id_bank_account_number: this.state.accountNumberId,
      id_user: this.props.id,
      direction: e.currentTarget.checked ? (this.state.isSwitch1Checked ? "all" : "in") : "out",
      from: this.state.from + " 00:00:00",
      to: this.state.to + " 23:59:59",
    };
    const fetchedData = await this.context.getAccountHistory(data, this.props.token);
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(this.props);
    } else if (fetchedData.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    } else if (fetchedData.length > 0) {
      fetchedData.forEach((element) => {
        element.amount = element.direction === "out" ? -element.amount : element.amount;
      });
      this.setState({ history: fetchedData });
    }
    this.handleSortChange(this.state.sortValue, this.state.sortDirection, fetchedData);
  }

  handleSelectAccountNumber = async (e) => {
    this.setState({ history: [] });
    this.setState({ loadingText: constantsClass.TEXT_LOADING });
    this.setState({ loadingTextClass: "loading" });
    this.setState({ accountNumberId: this.props.accounts[e.currentTarget.selectedIndex].id });
    this.setState({ currency: this.props.accounts[e.currentTarget.selectedIndex].currency });
    const data = {
      id_bank_account_number: this.props.accounts[e.currentTarget.selectedIndex].id,
      id_user: this.props.id,
      direction: this.state.direction,
      from: this.state.from + " 00:00:00",
      to: this.state.to + " 23:59:59",
    };
    const fetchedData = await this.context.getAccountHistory(data, this.props.token);
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(this.props);
    } else if (fetchedData.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    } else if (fetchedData.length > 0) {
      fetchedData.forEach((element) => {
        element.amount = element.direction === "out" ? -element.amount : element.amount;
      });
      this.setState({ history: fetchedData });
    }
    this.handleSortChange(this.state.sortValue, this.state.sortDirection, fetchedData);
  };

  async handleFromDateChange(e) {
    this.setState({ history: [] });
    this.setState({ loadingText: constantsClass.TEXT_LOADING });
    this.setState({ loadingTextClass: "loading" });
    const today = new Date();
    const from = e.currentTarget.valueAsDate;
    const to = new Date(this.state.to);
    let newTo = new Date(this.state.to);
    let newToString = newTo.toISOString().substring(0, 10);
    if (from.getTime() >= today.getTime()) {
      this.setState({ from: today.toISOString().substring(0, 10) });
    } else {
      const diffDays = (to.getTime() - from.getTime()) / 86400000;
      if (diffDays > 60) {
        newTo = structuredClone(from);
        newTo.setMonth(newTo.getMonth() + 2);
        newToString = newTo.toISOString().substring(0, 10);
        this.setState({ to: newToString });
      }
      if (diffDays < 0) {
        newTo = structuredClone(from);
        newTo.setMonth(newTo.getMonth() + 2);
        if (newTo.getTime() > today.getTime()) {
          newTo = structuredClone(today);
        }
        newToString = newTo.toISOString().substring(0, 10);
        this.setState({ to: newToString });
      }
      const fromString = from.toISOString().substring(0, 10);
      this.setState({ from: fromString });
      const data = {
        id_bank_account_number: this.state.accountNumberId,
        id_user: this.props.id,
        direction: this.state.direction,
        from: fromString + " 00:00:00",
        to: newToString + " 23:59:59",
      };
      const fetchedData = await this.context.getAccountHistory(data, this.props.token);
      if (fetchedData["error"] === "Lejárt token!") {
        sessionExpired(this.props);
      } else if (fetchedData.length === 0) {
        this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
        this.setState({ loadingTextClass: "no-data" });
      } else if (fetchedData.length > 0) {
        fetchedData.forEach((element) => {
          element.amount = element.direction === "out" ? -element.amount : element.amount;
        });
        this.setState({ history: fetchedData });
      }
      this.handleSortChange(this.state.sortValue, this.state.sortDirection, fetchedData);
    }
  }

  async handleToDateChange(e) {
    const today = new Date();
    let to = e.currentTarget.valueAsDate;
    const from = new Date(this.state.from);
    let newFrom = new Date(this.state.from);
    let newFromString = newFrom.toISOString().substring(0, 10);
    if (to.getTime() >= today.getTime()) {
      to = today;
    } else {
      this.setState({ history: [] });
      this.setState({ loadingText: constantsClass.TEXT_LOADING });
      this.setState({ loadingTextClass: "loading" });
    }
    const diffDays = (to.getTime() - from.getTime()) / 86400000;
    if (diffDays > 60) {
      newFrom = structuredClone(to);
      newFrom.setMonth(newFrom.getMonth() - 2);
      newFromString = newFrom.toISOString().substring(0, 10);
      this.setState({ from: newFromString });
    }
    if (diffDays < 0) {
      newFrom = structuredClone(to);
      newFrom.setMonth(newFrom.getMonth() - 2);
      newFromString = newFrom.toISOString().substring(0, 10);
      this.setState({ from: newFromString });
    }
    const toString = to.toISOString().substring(0, 10);
    this.setState({ to: toString });
    const data = {
      id_bank_account_number: this.state.accountNumberId,
      id_user: this.props.id,
      direction: this.state.direction,
      to: toString + " 23:59:59",
      from: newFromString + " 00:00:00",
    };
    const fetchedData = await this.context.getAccountHistory(data, this.props.token);
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(this.props);
    } else if (fetchedData.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    } else if (fetchedData.length > 0) {
      fetchedData.forEach((element) => {
        element.amount = element.direction === "out" ? -element.amount : element.amount;
      });
      this.setState({ history: fetchedData });
    }
    this.handleSortChange(this.state.sortValue, this.state.sortDirection, fetchedData);
  }

  render() {
    return (
      <Fragment>
        <BreadCrumbs
          data={[
            { name: "Netbank", link: "/" },
            { name: "Számlatörténet", link: "" },
          ]}
        />
        <div className="dashboard">
          <Row>
            <Col lg="12">
              <Card className="card netbank-card">
                <Card.Body className="card-body pb-0">
                  <div className="d-flex flex-row">
                    <div className="card-icon d-flex align-items-center justify-content-center">
                      <i className="bi bi-clock-history"></i>
                    </div>
                    <h5 className="card-title">Számlatörténet</h5>
                  </div>
                  <form className="row g-2 netbank-form">
                    <div className="col-md-12 form-item">
                      <label htmlFor="selectaccountNumber" className="form-label first-label">
                        Forrásszámla
                      </label>
                      <select id="selectaccountNumber" onChange={this.handleSelectAccountNumber} className="form-select">
                        {this.props.accounts.map((a) => (
                          <option key={a.id}>
                            {" "}
                            {translate(a.type)} - {a.number} - {formatAmount(a.balance)} {a.currency}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4 form-item">
                      <label htmlFor="inputAmount" className="form-label">
                        Kezdődátum
                      </label>
                      <input
                        type="date"
                        onChange={this.handleFromDateChange}
                        value={this.state.from}
                        className="form-control"
                        id="inputAmount1"
                      />
                    </div>
                    <div className="col-md-4 form-item">
                      <label htmlFor="inputAmount" className="form-label">
                        Záródátum
                      </label>
                      <input
                        type="date"
                        onChange={this.handleToDateChange}
                        value={this.state.to}
                        className="form-control"
                        id="inputAmount2"
                      />
                    </div>
                    <div className="col-md-4 form-item">
                      <label htmlFor="inputAmount" className="form-label">
                        Pénzmozgás iránya
                      </label>
                      <div className="mx-auto mt-2" style={{ textAlign: "center" }}>
                        <input
                          className="form-check-input"
                          onChange={this.handleSwitch1Change}
                          checked={this.state.isSwitch1Checked}
                          type="checkbox"
                          id="grid-check-history-1"
                        />
                        <span className="default-cursor" onClick={this.handleSwitch1Change}>
                          {" "}
                          Terhelések{" "}
                        </span>
                        <input
                          className="form-check-input"
                          onChange={this.handleSwitch2Change}
                          checked={this.state.isSwitch2Checked}
                          type="checkbox"
                          id="grid-check-history-2"
                        />
                        <span className="default-cursor" onClick={this.handleSwitch2Change}>
                          {" "}
                          Jóváírások{" "}
                        </span>
                      </div>
                    </div>
                  </form>
                  <Table striped responsive hover className="table table-borderless datatable">
                    <TableHeadHistory
                      onSortChange={this.handleSortChange}
                      col1="Dátum / Idő"
                      col2="Tranzakció típusa"
                      col3="Partner"
                      col4="Közlemény"
                      col5="Összeg"
                      sortIconTableHead1={this.state.sortIconTableHead1}
                      sortIconTableHead2={this.state.sortIconTableHead2}
                      sortIconTableHead3={this.state.sortIconTableHead3}
                      sortIconTableHead4={this.state.sortIconTableHead4}
                      sortIconTableHead5={this.state.sortIconTableHead5}
                    />
                    {this.state.history.length === 0 && <p className={this.state.loadingTextClass}>{this.state.loadingText}</p>}
                    <tbody>
                      {this.state.history.map((a) => (
                        <TableRowHistory
                          key={a.transaction_id}
                          transaction={a}
                          col1={a.arrived_on}
                          col2={a.transaction_type}
                          col3={a.partner_name}
                          col4={a.comment}
                          col5={a.amount}
                          currency={a.currency}
                          direction={a.direction}
                        />
                      ))}
                    </tbody>
                  </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(History);

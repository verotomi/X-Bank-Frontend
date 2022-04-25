import { ApiContext } from "../../../api/ApiProvider";
import { connect } from "react-redux";
import { Col, Table, Card, Badge } from "react-bootstrap";
import { sessionExpired, translate } from "../../../assets/script/scripts";
import { STATEMENTS_LOCATION } from "../../../assets/config/config";
import { tryToLogout, showLoggedOutModal } from "../../../actions/actions";
import * as constantsClass from "../../../assets/constant/constants";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import Filter from "./FilterStatements";
import React, { Fragment } from "react";
import TableHead from "./TableHeadStatements";
import TableRowStatements from "./TableRowStatements";

/**
 * A bankszámlakivonatok listája
 */
class StatementsBody extends React.Component {
  static contextType = ApiContext;
  static pageSize = 10;
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      filter: "Összes",
      filteredStatements: [],
      loadingText: "",
      loadingTextClass: "loading",
      selectedBankAccountId: "all",
      sortDirection: "ascending",
      sortIconTableHead1: "bi bi-caret-down-fill",
      sortIconTableHead2: "bi bi-chevron-expand",
      sortIconTableHead3: "bi bi-chevron-expand",
      sortValue: "",
      statements: [],
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleFilterChange(value) {
    this.setState({ filter: value });
    this.setState({ selectedBankAccountId: value === "all" ? "all" : value });
    this.handleSortChange(this.state.sortValue, this.state.sortDirection, this.state.statements);
  }

  handleSortChange(value, direction, array) {
    let temporaryArray = array == null ? this.state.filteredStatements : array.slice();
    switch (value) {
      case "Dátum":
        direction =
          direction == null
            ? this.state.sortIconTableHead1 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead1: "bi bi-caret-up-fill" });
          temporaryArray.sort(function (a, b) {
            a = a.account_statements_number.toLowerCase();
            b = b.account_statements_number.toLowerCase();
            return a > b ? -1 : 1;
          });
        } else if (direction === "descending" || this.state.sortIconTableHead1 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead1: "bi bi-caret-down-fill" });
          temporaryArray.sort(function (a, b) {
            a = a.account_statements_number.toLowerCase();
            b = b.account_statements_number.toLowerCase();
            return a > b ? 1 : -1;
          });
        }
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        break;
      case "Számlaszám":
        direction =
          direction == null
            ? this.state.sortIconTableHead2 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead2: "bi bi-caret-up-fill" });
          temporaryArray.sort(function (a, b) {
            if (translate(a.bank_accounts_number) === translate(b.bank_accounts_number)) {
              return b.account_statements_number.localeCompare(a.account_statements_number);
            }
            return translate(b.bank_accounts_number).localeCompare(translate(a.bank_accounts_number));
          });
        } else if (direction === "descending" || this.state.sortIconTableHead2 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead2: "bi bi-caret-down-fill" });
          temporaryArray.sort(function (a, b) {
            if (translate(a.bank_accounts_number) === translate(b.bank_accounts_number)) {
              return b.account_statements_number.localeCompare(a.account_statements_number);
            }
            return translate(a.bank_accounts_number).localeCompare(translate(b.bank_accounts_number));
          });
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        break;
      case "Számla típusa":
        direction =
          direction == null
            ? this.state.sortIconTableHead3 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead3: "bi bi-caret-up-fill" });
          temporaryArray.sort(function (a, b) {
            if (translate(a.type) === translate(b.type)) {
              return b.account_statements_number.localeCompare(a.account_statements_number);
            }
            return translate(b.type).localeCompare(translate(a.type));
          });
        } else if (direction === "descending" || this.state.sortIconTableHead3 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead3: "bi bi-caret-down-fill" });
          temporaryArray.sort(function (a, b) {
            if (translate(a.type) === translate(b.type)) {
              return b.account_statements_number.localeCompare(a.account_statements_number);
            }
            return translate(a.type).localeCompare(translate(b.type));
          });
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        break;
      default:
        temporaryArray = array;
        break;
    }
    this.setState({ filteredStatements: temporaryArray });
    this.setState({ sortDirection: direction });
    this.setState({ sortValue: value });
    if (temporaryArray.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    }
  }

  async componentDidMount() {
    this.setState({ loadingText: constantsClass.TEXT_LOADING });
    const fetchedData = await this.context.getStatements(this.props.id, this.props.token);
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(this.props);
    } else if (fetchedData.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    } else if (fetchedData.length > 0) {
      this.setState({ statements: fetchedData });
      this.setState({ filteredStatements: fetchedData });
    }
  }

  handleSelectAccountNumber = (e) => {
    this.setState({ selectedBankAccountId: e.target.value });
  };

  render() {
    const { filteredStatements } = this.state;
    const szurok = [];
    const ertek = [];
    this.props.accounts.map((a) => szurok.push(translate(a.type)));
    this.props.accounts.map((a) => ertek.push(a.id));
    return (
      <Fragment>
        <BreadCrumbs
          data={[
            { name: "Netbank", link: "/" },
            { name: "Bankszámla kivonatok", link: "" },
          ]}
        />
        <div className="dashboard">
          <Col lg="12">
            <Card className="card netbank-card">
              <Filter onFilterChange={this.handleFilterChange} szurok={szurok} ertek={ertek}></Filter>
              <Card.Body className="card-body pb-0">
                <div className="d-flex flex-row">
                  <div className="card-icon d-flex align-items-center justify-content-center">
                    <i className="bi bi-file-earmark-text"></i>
                  </div>
                  <h5 className="card-title">
                    Számlakivonatok
                    <span>
                      {" "}
                      <i className="bi bi-filter"></i>{" "}
                      {this.state.selectedBankAccountId === "all"
                        ? "Összes"
                        : translate(
                            this.state.selectedBankAccountId === "all"
                              ? "Összes"
                              : this.props.accounts.find((x) => x.id === this.state.selectedBankAccountId).type
                          )}{" "}
                    </span>
                  </h5>
                </div>
                <Table striped responsive hover className="table table-borderless datatable">
                  <TableHead
                    onSortChange={this.handleSortChange}
                    col1="Dátum"
                    col2="Számlaszám"
                    col3="Számla típusa"
                    sortIconTableHead1={this.state.sortIconTableHead1}
                    sortIconTableHead2={this.state.sortIconTableHead2}
                    sortIconTableHead3={this.state.sortIconTableHead3}
                  />
                  {(this.state.selectedBankAccountId === "all"
                    ? filteredStatements
                    : filteredStatements.filter((s) => s.id_bank_account === this.state.selectedBankAccountId)
                  ).length === 0 && <p className={this.state.loadingTextClass}>{this.state.loadingText}</p>}
                  <tbody>
                    {(this.state.selectedBankAccountId === "all"
                      ? filteredStatements
                      : filteredStatements.filter((s) => s.id_bank_account === this.state.selectedBankAccountId)
                    ).map((a) => (
                      <TableRowStatements
                        key={a.account_statements_id}
                        col1={a.account_statements_number}
                        col2={a.bank_accounts_number}
                        col3={translate(a.type)}
                        col4={
                          <a href={STATEMENTS_LOCATION + "/" + a.filename} target="_blank" rel="noopener noreferrer">
                            <h5>
                              <Badge className="btn badge bg-success">
                                <i className="bi bi-eye"></i> &nbsp;Megtekintés
                              </Badge>
                            </h5>
                          </a>
                        }
                      />
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(StatementsBody);

import { ApiContext } from "../../../api/ApiProvider";
import { Col, Table, Card, Badge, Modal, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { sessionExpired, translate } from "../../../assets/script/scripts";
import { tryToLogout, showLoggedOutModal } from "../../../actions/actions";
import { useNavigate } from "react-router-dom";
import * as constantsClass from "../../../assets/constant/constants";
import Filter from "./FilterSavings";
import React, { Fragment } from "react";
import TableHeadSavings from "./TableHeadSavings";
import TableRowSavings from "./TableRowSavings";
import BreadCrumbs from "../../Shared/BreadCrumbs";

class Savings extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      actualSavingId: 0,
      alert1Color: "danger",
      buttonsAreDisabled: false,
      filter: "Összes",
      filteredSavings: [],
      loadingText: "",
      loadingTextClass: "loading",
      modalIsOpen: false,
      nodeValueNumber: 0,
      savings: [],
      showAlert1: false,
      sortDirection: "ascending",
      sortIconTableHead1: "bi bi-chevron-expand",
      sortIconTableHead2: "bi bi-chevron-expand",
      sortIconTableHead3: "bi bi-chevron-expand",
      sortIconTableHead4: "bi bi-chevron-expand",
      sortIconTableHead5: "bi bi-chevron-expand",
      sortIconTableHead6: "bi bi-chevron-expand",
      sortIconTableHead7: "bi bi-chevron-expand",
      sortValue: "",
      tableStyleDisplay: "",
      token: "",
      validationResponse: "",
    };
    this.closeModal = this.closeModal.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleAlert1Close = this.handleAlert1Close.bind(this);
    this.handleBreakDeposit = this.handleBreakDeposit.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  handleFilterChange(value) {
    this.setState({ filter: value });
    let temporarySavings = this.state.savings;
    switch (value) {
      case "Aktív":
        temporarySavings = this.state.savings.filter((x) => x.saving_status === "Active");
        break;
      case "Lejárt":
        temporarySavings = this.state.savings.filter((x) => x.saving_status === "Expired");
        break;
      case "Feltört":
        temporarySavings = this.state.savings.filter((x) => x.saving_status === "Breaked");
        break;
      default:
        temporarySavings = this.state.savings;
        break;
    }
    this.setState({ filteredSavings: temporarySavings });
    if (temporarySavings.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    }
    this.handleSortChange(
      this.state.sortValue === "" ? value : this.state.sortValue,
      this.state.sortDirection,
      temporarySavings
    );
  }

  handleSortChange(value, direction, array) {
    let temporarySavings = array == null ? this.state.filteredSavings : array.slice();
    switch (value) {
      case "Típus":
        direction =
          direction == null
            ? this.state.sortIconTableHead1 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead1: "bi bi-caret-up-fill" });
          temporarySavings.sort(function (a, b) {
            if (translate(a.type) === translate(b.type)) {
              return a.expire_date > b.expire_date ? 1 : -1;
            }
            return translate(a.type) > translate(b.type) ? -1 : 1;
          });
        } else if (direction === "descending" || this.state.sortIconTableHead1 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead1: "bi bi-caret-down-fill" });
          temporarySavings.sort(function (a, b) {
            if (translate(a.type) === translate(b.type)) {
              return a.expire_date > b.expire_date ? 1 : -1;
            }
            return translate(a.type) > translate(b.type) ? 1 : -1;
          });
        }
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead4: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead5: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead6: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead7: "bi bi-chevron-expand" });
        break;
      case "Forrásszámla":
        direction =
          direction == null
            ? this.state.sortIconTableHead2 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead2: "bi bi-caret-up-fill" });
          temporarySavings.sort(function (a, b) {
            if (translate(a.number) === translate(b.number)) {
              return a.expire_date > b.expire_date ? 1 : -1;
            }
            return translate(a.number) > translate(b.number) ? -1 : 1;
          });
        } else if (direction === "descending" || this.state.sortIconTableHead2 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead2: "bi bi-caret-down-fill" });
          temporarySavings.sort(function (a, b) {
            if (translate(a.number) === translate(b.number)) {
              return a.expire_date > b.expire_date ? 1 : -1;
            }
            return translate(a.number) > translate(b.number) ? 1 : -1;
          });
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead4: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead5: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead6: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead7: "bi bi-chevron-expand" });
        break;
      case "Lejárat":
        direction =
          direction == null
            ? this.state.sortIconTableHead3 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead3: "bi bi-caret-up-fill" });
          temporarySavings.sort((a, b) => (a.expire_date > b.expire_date ? -1 : 1));
        } else if (direction === "descending" || this.state.sortIconTableHead3 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead3: "bi bi-caret-down-fill" });
          temporarySavings.sort((a, b) => (a.expire_date > b.expire_date ? 1 : -1));
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead4: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead5: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead6: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead7: "bi bi-chevron-expand" });
        break;
      case "Kamat":
        direction =
          direction == null
            ? this.state.sortIconTableHead4 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead4: "bi bi-caret-up-fill" });
          temporarySavings.sort(function (a, b) {
            if (parseInt(a.rate) === parseInt(b.rate)) {
              return a.expire_date > b.expire_date ? 1 : -1;
            }
            return parseInt(a.rate) > parseInt(b.rate) ? -1 : 1;
          });
        } else if (direction === "descending" || this.state.sortIconTableHead4 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead4: "bi bi-caret-down-fill" });
          temporarySavings.sort(function (a, b) {
            if (parseInt(a.rate) === parseInt(b.rate)) {
              return a.expire_date > b.expire_date ? 1 : -1;
            }
            return parseInt(a.rate) > parseInt(b.rate) ? 1 : -1;
          });
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead5: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead6: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead7: "bi bi-chevron-expand" });
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
          temporarySavings.sort(function (a, b) {
            if (parseInt(a.amount) === parseInt(b.amount)) {
              return a.expire_date > b.expire_date ? 1 : -1;
            }
            return parseInt(a.amount) > parseInt(b.amount) ? -1 : 1;
          });
        } else if (direction === "descending" || this.state.sortIconTableHead4 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead5: "bi bi-caret-down-fill" });
          temporarySavings.sort(function (a, b) {
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
        this.setState({ sortIconTableHead6: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead7: "bi bi-chevron-expand" });
        break;
      case "Pénznem":
        direction =
          direction == null
            ? this.state.sortIconTableHead6 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead6: "bi bi-caret-up-fill" });
          temporarySavings.sort(function (a, b) {
            if (a.currency === b.currency) {
              return parseInt(a.amount) > parseInt(b.amount) ? 1 : -1;
            }
            return a.currency > b.currency ? -1 : 1;
          });
        } else if (direction === "descending" || this.state.sortIconTableHead4 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead6: "bi bi-caret-down-fill" });
          temporarySavings.sort(function (a, b) {
            if (a.currency === b.currency) {
              return parseInt(a.amount) > parseInt(b.amount) ? 1 : -1;
            }
            return a.currency > b.currency ? 1 : -1;
          });
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead4: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead5: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead7: "bi bi-chevron-expand" });
        break;
      case "Állapot":
        direction =
          direction == null
            ? this.state.sortIconTableHead7 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead7: "bi bi-caret-up-fill" });
          temporarySavings.sort(function (a, b) {
            if (translate(a.saving_status) === translate(b.saving_status)) {
              return a.expire_date > b.expire_date ? 1 : -1;
            }
            return translate(a.saving_status) > translate(b.saving_status) ? -1 : 1;
          });
        } else if (direction === "descending" || this.state.sortIconTableHead4 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead7: "bi bi-caret-down-fill" });
          temporarySavings.sort(function (a, b) {
            if (translate(a.saving_status) === translate(b.saving_status)) {
              return a.expire_date > b.expire_date ? 1 : -1;
            }
            return translate(a.saving_status) > translate(b.saving_status) ? 1 : -1;
          });
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead4: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead5: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead6: "bi bi-chevron-expand" });
        break;
      default:
        temporarySavings = array;
        break;
    }
    this.setState({ filteredSavings: temporarySavings });
    this.setState({ sortDirection: direction });
    this.setState({ sortValue: value });
    if (temporarySavings.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    }
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
    this.setState({ showAlert1: false });
    this.setState({ buttonsAreDisabled: false });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id_user: this.props.id,
      id: this.state.actualSavingId,
    };
    this.setState({ buttonsAreDisabled: true });
    const fetchedData = await this.context.breakDeposit(data, this.props.token);
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(this.props);
    } else if (!fetchedData["error"]) {
      this.setState({ validationResponse: "A megtakarítás feltörésre került!" });
      this.setState({ alert1Color: "success" });
      this.setState({ showAlert1: true });
      this.setState({ isError: false });
      this.setState({ savings: fetchedData });
      this.setState({ filteredSavings: fetchedData });
    } else {
      this.setState({ validationResponse: fetchedData["error"] });
      this.setState({ alert1Color: "danger" });
      this.setState({ showAlert1: true });
      this.setState({ isError: true });
    }
  };

  async componentDidMount() {
    this.setState({ loadingText: constantsClass.TEXT_LOADING });
    const fetchedData = await this.context.getSavings(this.props.id, this.props.token);
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(this.props);
    } else if (fetchedData.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    } else if (fetchedData.length > 0) {
      this.setState({ savings: fetchedData });
      this.setState({ filteredSavings: fetchedData });
      this.setState({ tableStyleDisplay: "block" });
    }
  }

  handleBreakDeposit(e, a) {
    this.setState({ actualSavingId: a.saving_id });
    this.setState({ modalIsOpen: true });
    e.preventDefault(e);
    this.setState({ nodeValueNumber: e.target.attributes.number.nodeValue });
  }

  handleAlert1Close() {
    this.setState({ showAlert1: false });
    this.setState({ buttonsAreDisabled: false });
    this.closeModal();
  }

  render() {
    const filteredSavings2 = this.state.filteredSavings;
    let i = 0;
    return (
      <Fragment>
        {this.props.type !== "light" && (
          <BreadCrumbs
            data={[
              { name: "Netbank", link: "/attekintes" },
              { name: "Megtakarítások", link: " " },
              { name: "Megtakarítások listája", link: "" },
            ]}
          />
        )}
        <div className="dashboard">
          <Col lg="12">
            <Card
              className={
                this.props.type === "light"
                  ? "card netbank-card card-small"
                  : "card netbank-card"
              }
            >
              <Filter
                onFilterChange={this.handleFilterChange}
                filter1="Összes"
                filter2="Aktív"
                filter3="Lejárt"
                filter4="Feltört"
              ></Filter>
              <Card.Body className="card-body pb-0">
                <div className="d-flex flex-row">
                  <div className="card-icon d-flex align-items-center justify-content-center">
                    <i className="bi bi-piggy-bank"></i>
                  </div>
                  <h5 className="card-title">
                    Megtakarítások<span> <i className="bi bi-filter"> </i>{this.state.filter}</span>
                  </h5>
                </div>
                <Table
                  striped
                  responsive
                  hover
                  className={
                    this.props.type === "light"
                      ? "table table-borderless datatable scrollableTable"
                      : "table table-borderless datatable"
                  }
                  style={this.props.type === "light" ? { display: this.state.tableStyleDisplay } : {}}
                >
                  <TableHeadSavings
                    type="light"
                    onSortChange={this.handleSortChange}
                    col1="Típus"
                    col2="Forrásszámla"
                    col3="Lejárat"
                    col4="Kamat"
                    col5="Összeg"
                    col6="Pénznem"
                    col7="Állapot"
                    sortIconTableHead1={this.state.sortIconTableHead1}
                    sortIconTableHead2={this.state.sortIconTableHead2}
                    sortIconTableHead3={this.state.sortIconTableHead3}
                    sortIconTableHead4={this.state.sortIconTableHead4}
                    sortIconTableHead5={this.state.sortIconTableHead5}
                    sortIconTableHead6={this.state.sortIconTableHead6}
                    sortIconTableHead7={this.state.sortIconTableHead7}
                  />
                  {filteredSavings2.length === 0 && <p className={this.state.loadingTextClass}>{this.state.loadingText}</p>}
                  <tbody>
                    {filteredSavings2.map(
                      (a) =>
                        this.props.type === "light" && (
                          <TableRowSavings
                            key={a.saving_id}
                            saving={a}
                            col1={translate(a.type)}
                            col2={a.number}
                            col3={a.expire_date}
                            col4={a.rate + " %"}
                            col5={a.amount}
                            col6={a.currency}
                            col7={translate(a.saving_status)}
                          />
                        )
                    )}
                    {filteredSavings2.map(
                      (a) =>
                        this.props.type !== "light" && (
                          <TableRowSavings
                            key={a.saving_id}
                            saving={a}
                            col1={translate(a.type)}
                            col2={a.number}
                            col3={a.expire_date}
                            col4={a.rate + " %"}
                            col5={a.amount}
                            col6={a.currency}
                            col7={translate(a.saving_status)}
                            col8={
                              a.saving_status === "Active" ? (
                                <h5>
                                  <Badge
                                    number={i++}
                                    onClick={(e) => this.handleBreakDeposit(e, a)}
                                    className="btn badge bg-danger"
                                  >
                                    <i className="bi bi-x-square"></i> &nbsp;Feltörés
                                  </Badge>
                                </h5>
                              ) : (
                                <p number={i++}></p>
                              )
                            }
                          />
                        )
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <h5 className="card-title text-center pb-0 fs-4">Biztos, hogy feltöri a megtakarítást</h5>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Alert
                  variant={this.state.alert1Color}
                  onClose={this.handleAlert1Close}
                  show={this.state.showAlert1}
                  dismissible
                >
                  {this.state.validationResponse}
                </Alert>
                <Card.Body className="pb-0">
                  <form onSubmit={this.handleSubmit} className="row g-3 needs-validation" noValidate>
                    <Button disabled={this.state.buttonsAreDisabled} className="btn btn-success w-100" type="submit">
                      Igen
                    </Button>
                    <Button disabled={this.state.buttonsAreDisabled} variant="secondary" onClick={this.closeModal}>
                      Mégsem
                    </Button>
                  </form>
                </Card.Body>
              </Modal.Body>
            </Modal>
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

function withNavigate(WrappedComponent) {
  return (props) => {
    const navigate = useNavigate();
    return <WrappedComponent navigate={navigate} {...props} />;
  };
}

export default withNavigate(connect(mapStateToProps, mapDispatchToProps)(Savings));

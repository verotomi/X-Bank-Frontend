import { ApiContext } from "../../../api/ApiProvider";
import { Col, Table, Card, Badge, Modal, Alert, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { translate, formatAmount, sessionExpired } from "../../../assets/script/scripts";
import { tryToLogout, showLoggedOutModal } from "../../../actions/actions";
import * as constantsClass from "../../../assets/constant/constants";
import Filter from "./FilterRecurringTransfers";
import React, { Fragment } from "react";
import TableHead from "./TableHeadRecurringTransfers";
import TableRowRecurringTransfers from "./TableRowRecurringTransfers";
import BreadCrumbs from "../../Shared/BreadCrumbs";

class RecurringTransfers extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      alert1Color: "danger",
      buttonsAreDisabled: false,
      filter: "Összes",
      filteredRecurringTransfers: [],
      loadingText: "",
      loadingTextClass: "loading",
      modalIsOpen: false,
      nodeValueId: 0,
      recurringTransfers: [],
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
      token: "",
      validationResponse: "",
    };
    this.closeModal = this.closeModal.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleAlert1Close = this.handleAlert1Close.bind(this);
    this.handleDeleteRecurringTransfer = this.handleDeleteRecurringTransfer.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  handleFilterChange(value) {
    this.setState({ filteredRecurringTransfers: this.state.recurringTransfers });
    this.setState({ filter: value });
    let temporaryRecurringTransfers = this.state.recurringTransfers;
    switch (value) {
      case "Aktív":
        temporaryRecurringTransfers = this.state.recurringTransfers.filter((x) => x.recurring_transfer_status === "Active");
        break;
      case "Inaktív":
        temporaryRecurringTransfers = this.state.recurringTransfers.filter((x) => x.recurring_transfer_status === "Inactive");
        break;
      default:
        temporaryRecurringTransfers = this.state.recurringTransfers;
        break;
    }
    this.setState({ filteredRecurringTransfers: temporaryRecurringTransfers });
    if (temporaryRecurringTransfers.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    }
    this.handleSortChange(this.state.sortValue, this.state.sortDirection, temporaryRecurringTransfers);
  }
  handleSortChange(value, direction, array) {
    let temporaryArray = array == null ? this.state.filteredRecurringTransfers : array.slice();
    switch (value) {
      case "Állandó megbízás neve":
        direction =
          direction == null
            ? this.state.sortIconTableHead1 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead1: "bi bi-caret-up-fill" });
          temporaryArray.sort(function (a, b) {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a > b ? -1 : 1;
          });
        } else if (direction === "descending" || this.state.sortIconTableHead1 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead1: "bi bi-caret-down-fill" });
          temporaryArray.sort(function (a, b) {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a > b ? 1 : -1;
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
          temporaryArray.sort(function (a, b) {
            if (translate(a.number) === translate(b.number)) {
              a = a.name.toLowerCase();
              b = b.name.toLowerCase();
              return a > b ? 1 : -1;
            }
            return translate(a.number) > translate(b.number) ? -1 : 1;
          });
        } else if (direction === "descending" || this.state.sortIconTableHead2 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead2: "bi bi-caret-down-fill" });
          temporaryArray.sort(function (a, b) {
            if (translate(a.number) === translate(b.number)) {
              a = a.name.toLowerCase();
              b = b.name.toLowerCase();
              return a > b ? 1 : -1;
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
      case "Kedvezményezett":
        direction =
          direction == null
            ? this.state.sortIconTableHead3 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead3: "bi bi-caret-up-fill" });
          temporaryArray.sort(function (a, b) {
            if (a.partner_name === b.partner_name) {
              return a.name.localeCompare(b.name);
            }
            return b.partner_name.localeCompare(a.partner_name);
          });
        } else if (direction === "descending" || this.state.sortIconTableHead3 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead3: "bi bi-caret-down-fill" });
          temporaryArray.sort(function (a, b) {
            if (a.partner_name === b.partner_name) {
              return a.name.localeCompare(b.name);
            }
            return a.partner_name.localeCompare(b.partner_name);
          });
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead4: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead5: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead6: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead7: "bi bi-chevron-expand" });
        break;
      case "Összeg":
        direction =
          direction == null
            ? this.state.sortIconTableHead4 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead4: "bi bi-caret-up-fill" });
          temporaryArray.sort(function (a, b) {
            if (parseInt(a.amount) === parseInt(b.amount)) {
              return a.expire_date > b.expire_date ? 1 : -1;
            }
            return parseInt(a.amount) > parseInt(b.amount) ? -1 : 1;
          });
        } else if (direction === "descending" || this.state.sortIconTableHead4 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead4: "bi bi-caret-down-fill" });
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
        this.setState({ sortIconTableHead5: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead6: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead7: "bi bi-chevron-expand" });
        break;
      case "Pénznem":
        direction =
          direction == null
            ? this.state.sortIconTableHead5 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead5: "bi bi-caret-up-fill" });
          temporaryArray.sort(function (a, b) {
            if (a.currency === b.currency) {
              return parseInt(a.amount) > parseInt(b.amount) ? 1 : -1;
            }
            return a.currency > b.currency ? -1 : 1;
          });
        } else if (direction === "descending" || this.state.sortIconTableHead4 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead5: "bi bi-caret-down-fill" });
          temporaryArray.sort(function (a, b) {
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
        this.setState({ sortIconTableHead6: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead7: "bi bi-chevron-expand" });
        break;
      case "Ismétlődés":
        direction =
          direction == null
            ? this.state.sortIconTableHead6 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead6: "bi bi-caret-up-fill" });
          temporaryArray.sort(function (a, b) {
            a = translate(a.frequency) + " " + isNaN(a.days) ? translate(a.days) : a.days + ". napján";
            b = translate(b.frequency) + " " + isNaN(b.days) ? translate(b.days) : b.days + ". napján";
            return a.localeCompare(b);
          });
        } else if (direction === "descending" || this.state.sortIconTableHead4 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead6: "bi bi-caret-down-fill" });
          temporaryArray.sort(function (a, b) {
            a = translate(a.frequency) + " " + isNaN(a.days) ? translate(a.days) : a.days + ". napján";
            b = translate(b.frequency) + " " + isNaN(b.days) ? translate(b.days) : b.days + ". napján";
            return b.localeCompare(a);
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
          temporaryArray.sort(function (a, b) {
            if (translate(a.recurring_transfer_status) === translate(b.recurring_transfer_status)) {
              return a.name.localeCompare(b.name);
            }
            return translate(a.recurring_transfer_status) > translate(b.recurring_transfer_status) ? -1 : 1;
          });
        } else if (direction === "descending" || this.state.sortIconTableHead4 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead7: "bi bi-caret-down-fill" });
          temporaryArray.sort(function (a, b) {
            if (translate(a.recurring_transfer_status) === translate(b.recurring_transfer_status)) {
              return a.name.localeCompare(b.name);
            }
            return translate(a.recurring_transfer_status) > translate(b.recurring_transfer_status) ? 1 : -1;
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
        temporaryArray = array;
        break;
    }
    this.setState({ filteredRecurringTransfers: temporaryArray });
    this.setState({ sortDirection: direction });
    this.setState({ sortValue: value });
    if (temporaryArray.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    }
  }

  async componentDidMount() {
    this.setState({ loadingText: constantsClass.TEXT_LOADING });
    const fetchedData = await this.context.getRecurringTransfers(this.props.id, this.props.token);
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(this.props);
    } else if (fetchedData.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    } else if (fetchedData.length > 0) {
      this.setState({ recurringTransfers: fetchedData });
      this.setState({ filteredRecurringTransfers: fetchedData });
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

  handleAlert1Close() {
    this.setState({ showAlert1: false });
    this.setState({ buttonsAreDisabled: false });
    this.closeModal();
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id_user: this.props.id,
      id: this.state.nodeValueId,
    };
    this.setState({ buttonsAreDisabled: true });
    const fetchedData = await this.context.deleteRecurringTransfer(data, this.props.token);
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(this.props);
    } else if (!fetchedData["error"]) {
      this.setState({ validationResponse: "Az állandó megbízás törölve lett!" });
      this.setState({ alert1Color: "success" });
      this.setState({ showAlert1: true });
      this.setState({ isError: false });
      this.setState({ recurringTransfers: fetchedData });
      this.setState({ filteredRecurringTransfers: fetchedData });
    } else {
      this.setState({ validationResponse: fetchedData["error"] });
      this.setState({ alert1Color: "danger" });
      this.setState({ showAlert1: true });
      this.setState({ isError: true });
    }
  };

  handleDeleteRecurringTransfer(e) {
    this.setState({ nodeValueId: e.target.attributes.id.nodeValue });
    this.setState({ nodeValueNumber: e.target.attributes.number.nodeValue });
    this.setState({ modalIsOpen: true });
    e.preventDefault(e);
  }

  render() {
    const filteredRecurringTransfers2 = this.state.filteredRecurringTransfers;
    let i = 0;

    return (
      <Fragment>
        <BreadCrumbs
          data={[
            { name: "Netbank", link: "/attekintes" },
            { name: "Állandó megbízások", link: " " },
            { name: "Állandó megbízások listája", link: "" },
          ]}
          
        />
        <div className="dashboard">
          <Col lg="12">
            <Card className="card netbank-card">
              <Filter onFilterChange={this.handleFilterChange} filter1="Összes" filter2="Aktív" filter3="Inaktív"></Filter>
              <Card.Body className="card-body pb-0">
                <div className="d-flex flex-row">
                  <div className="card-icon d-flex align-items-center justify-content-center">
                    <i className="bi bi-arrow-clockwise"></i>
                  </div>
                  <h5 className="card-title">
                    Állandó megbízások<span> <i className="bi bi-filter"> </i>{this.state.filter}</span>
                  </h5>
                </div>
                <Table striped hover responsive className="table table-borderless datatable">
                  <TableHead
                    onSortChange={this.handleSortChange}
                    col1="Állandó megbízás neve"
                    col2="Forrásszámla"
                    col3="Kedvezményezett"
                    col4="Összeg"
                    col5="Pénznem"
                    col6="Ismétlődés"
                    col7="Állapot"
                    sortIconTableHead1={this.state.sortIconTableHead1}
                    sortIconTableHead2={this.state.sortIconTableHead2}
                    sortIconTableHead3={this.state.sortIconTableHead3}
                    sortIconTableHead4={this.state.sortIconTableHead4}
                    sortIconTableHead5={this.state.sortIconTableHead5}
                    sortIconTableHead6={this.state.sortIconTableHead6}
                    sortIconTableHead7={this.state.sortIconTableHead7}
                  />
                  {filteredRecurringTransfers2.length === 0 && (
                    <p className={this.state.loadingTextClass}>{this.state.loadingText}</p>
                  )}
                  <tbody>
                    {filteredRecurringTransfers2.map((a) => (
                      <TableRowRecurringTransfers
                        key={a.recurring_transfer_id}
                        col1={a.name}
                        col2={a.number}
                        col3={a.partner_name}
                        col4={formatAmount(a.amount)}
                        col5={a.currency}
                        frequency={translate(a.frequency)}
                        days={isNaN(a.days) ? translate(a.days) : a.days + ". napján"}
                        col7={translate(a.recurring_transfer_status)}
                        col8={
                          <h5>
                            <Link className="btn badge bg-success" to="/allandomegbizasmodositas" state={a}>
                              <i className="bi bi-pencil"></i> &nbsp;Módosítás
                            </Link>
                          </h5>
                        }
                        col9={
                          <h5>
                            <Badge
                              id={a.recurring_transfer_id}
                              number={i++}
                              onClick={this.handleDeleteRecurringTransfer}
                              className="btn badge bg-danger"
                            >
                              <i className="bi bi-x-square"></i> &nbsp;Törlés
                            </Badge>
                          </h5>
                        }
                      />
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <h5 className="card-title text-center pb-0 fs-4">Biztos, hogy törli az állandó megbízást?</h5>
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

export default connect(mapStateToProps, mapDispatchToProps)(RecurringTransfers);

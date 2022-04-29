import { ApiContext } from "../../../api/ApiProvider";
import { Col, Table, Card, Button, Badge, Modal, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sessionExpired } from "../../../assets/script/scripts";
import { tryToLogout, showLoggedOutModal } from "../../../actions/actions";
import * as constantsClass from "../../../assets/constant/constants";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import React, { Component, Fragment } from "react";
import TableHeadBeneficiaries from "./TableHeadBeneficiaries";
import TableRowBeneficiaries from "./TableRowBeneficiaries";

/**
 * A kedvezményezettek megjelenítése
 */
class BeneficiariesList extends Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      beneficiaries: [],
      nodeValueId: 0,
      nodeValueNumber: 0,
      modalIsOpen: false,
      loadingText: "",
      loadingTextClass: "loading",
      showAlert1: false,
      alert1Color: "danger",
      validationResponse: "",
      sortIconTableHead1: "bi bi-chevron-expand",
      sortIconTableHead2: "bi bi-chevron-expand",
      sortIconTableHead3: "bi bi-chevron-expand",
    };
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleAlert1Close = this.handleAlert1Close.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleSortChange(value) {
    let temporaryArray = this.state.beneficiaries.slice();
    switch (value) {
      case "Sablon neve":
        if (this.state.sortIconTableHead1 === "bi bi-caret-down-fill") {
          this.setState({ sortIconTableHead1: "bi bi-caret-up-fill" });
          temporaryArray.sort(function (a, b) {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a > b ? -1 : 1;
          });
        } else if (
          this.state.sortIconTableHead1 === "bi bi-caret-up-fill" ||
          this.state.sortIconTableHead1 === "bi bi-chevron-expand"
        ) {
          this.setState({ sortIconTableHead1: "bi bi-caret-down-fill" });
          temporaryArray.sort(function (a, b) {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a > b ? 1 : -1;
          });
        }
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        break;
      case "Partner neve":
        if (this.state.sortIconTableHead2 === "bi bi-caret-down-fill") {
          this.setState({ sortIconTableHead2: "bi bi-caret-up-fill" });
          temporaryArray.sort(function (a, b) {
            a = a.partner_name.toLowerCase();
            b = b.partner_name.toLowerCase();
            return a > b ? -1 : 1;
          });
        } else if (
          this.state.sortIconTableHead2 === "bi bi-caret-up-fill" ||
          this.state.sortIconTableHead2 === "bi bi-chevron-expand"
        ) {
          this.setState({ sortIconTableHead2: "bi bi-caret-down-fill" });
          temporaryArray.sort(function (a, b) {
            a = a.partner_name.toLowerCase();
            b = b.partner_name.toLowerCase();
            return a > b ? 1 : -1;
          });
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        break;
      case "Partner számlaszáma":
        if (this.state.sortIconTableHead3 === "bi bi-caret-down-fill") {
          this.setState({ sortIconTableHead3: "bi bi-caret-up-fill" });
          temporaryArray.sort(function (a, b) {
            a = a.partner_account_number.toLowerCase();
            b = b.partner_account_number.toLowerCase();
            return a > b ? -1 : 1;
          });
        } else if (
          this.state.sortIconTableHead3 === "bi bi-caret-up-fill" ||
          this.state.sortIconTableHead3 === "bi bi-chevron-expand"
        ) {
          this.setState({ sortIconTableHead3: "bi bi-caret-down-fill" });
          temporaryArray.sort(function (a, b) {
            a = a.partner_account_number.toLowerCase();
            b = b.partner_account_number.toLowerCase();
            return a > b ? 1 : -1;
          });
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        break;
      default:
        temporaryArray = this.state.temporaryArray;
        break;
    }
    this.setState({ beneficiaries: temporaryArray });
    if (temporaryArray.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    }
  }

  async componentDidMount() {
    this.setState({ loadingText: constantsClass.TEXT_LOADING });
    const fetchedData = await this.context.getBeneficiaries(this.props.id, this.props.token);
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(this.props);
    } else if (fetchedData.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    } else if (fetchedData.length > 0) {
      this.setState({ beneficiaries: fetchedData });
    }
  }

  handleDeleteButton(e) {
    this.setState({ nodeValueId: e.target.attributes.id.nodeValue });
    this.setState({ nodeValueNumber: e.target.attributes.number.nodeValue });
    this.setState({ modalIsOpen: true });
    e.preventDefault();
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
    this.setState({ loadingTextClass: "loading" });
    this.setState({ loadingText: constantsClass.TEXT_LOADING });
    this.setState({ buttonsAreDisabled: true });
    const fetchedData = await this.context.deleteBeneficiary({ id: this.state.nodeValueId }, this.props.token);
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(this.props);
    } else if (!fetchedData["error"]) {
      const beneficiaries2 = this.state.beneficiaries;
      beneficiaries2.find((element) => (element.id = this.state.nodeValueId));
      const newArray = this.state.beneficiaries;
      newArray.splice(this.state.nodeValueNumber, 1);
      this.setState({ beneficiaries: newArray });
      this.setState({ validationResponse: "A kedvezményezett törölve lett!" });
      this.setState({ alert1Color: "success" });
      this.setState({ showAlert1: true });
      this.setState({ isError: false });
    } else {
      this.setState({ validationResponse: "A művelet során hiba keletkezett!" });
      this.setState({ alert1Color: "alert" });
      this.setState({ showAlert1: true });
      this.setState({ isError: true });
    }
  };
  handleAlert1Close() {
    this.setState({ showAlert1: false });
    this.setState({ buttonsAreDisabled: false });
    this.closeModal();
  }

  render() {
    const { beneficiaries } = this.state;
    let i = 0;
    return (
      <Fragment>
        <BreadCrumbs
          data={[
            { name: "Netbank", link: "/" },
            { name: "Kedvezményezettek", link: " " },
            { name: "Kedvezényezettek listája", link: "" },
          ]}
        />
        <div className="dashboard">
          <Col lg="12">
            <Card className="card netbank-card">
              <Card.Body className="card-body pb-0">
                <div className="d-flex flex-row">
                  <div className="card-icon d-flex align-items-center justify-content-center">
                    <i className="bi bi-people"></i>
                  </div>
                  <h5 className="card-title">Kedvezményezettek</h5>
                </div>
                <Table striped responsive hover className="table table-borderless datatable">
                  <TableHeadBeneficiaries
                    onSortChange={this.handleSortChange}
                    col1="Sablon neve"
                    col2="Partner neve"
                    col3="Partner számlaszáma"
                    sortIconTableHead1={this.state.sortIconTableHead1}
                    sortIconTableHead2={this.state.sortIconTableHead2}
                    sortIconTableHead3={this.state.sortIconTableHead3}
                  />
                  {beneficiaries.length === 0 && <p className={this.state.loadingTextClass}>{this.state.loadingText}</p>}
                  <tbody>
                    {beneficiaries.map((a) => (
                      <TableRowBeneficiaries
                        key={a.id}
                        col1={a.name}
                        col2={a.partner_name}
                        col3={a.partner_account_number}
                        col4={
                          <h5>
                            <Link className="btn badge bg-success" to="/kedvezmenyezettmodositas" state={a}>
                              <i className="ri-edit-box-line"></i> Módosítás
                            </Link>
                          </h5>
                        }
                        col5={
                          <h5>
                            <Badge id={a.id} number={i++} onClick={this.handleDeleteButton} className="btn badge bg-danger">
                              <i className="bi bi-x-square"></i> Törlés
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
                  <h5 className="card-title text-center pb-0 fs-4">Biztos, hogy törli a kedvezményezettet?</h5>
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
                  <form onSubmit={this.handleSubmit} className="row g-3" noValidate>
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
export default withNavigate(connect(mapStateToProps, mapDispatchToProps)(BeneficiariesList));

import React, { Fragment } from "react";
import { Row } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import TableHeadAtms from "./TableHeadAtms";
import TableRowAtms from "./TableRowAtms";
import FilterAtms from "./FilterAtms";
import { Col, Table, Card } from "react-bootstrap";
import { ApiContext } from "../../../api/ApiProvider";
import * as constantsClass from "../../../assets/constant/constants";

export default class Atms extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      atms: [],
      filter: "Összes",
      filteredAtms: [],
      loadingText: "",
      loadingTextClass: "loading",
      sortDirection: "ascending",
      sortIconTableHead1: "bi bi-chevron-expand",
      sortIconTableHead2: "bi bi-chevron-expand",
      sortIconTableHead3: "bi bi-chevron-expand",
      sortIconTableHead4: "bi bi-chevron-expand",
      sortValue: "",
      tableStyleDisplay: "",
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleFilterChange(value) {
    this.setState({ filter: value });
    let temporaryAtms = this.state.atms;
    switch (value) {
      case "Forint":
        temporaryAtms = this.state.atms.filter((x) => x.type === "Forint");
        break;
      case "Euro":
        temporaryAtms = this.state.atms.filter((x) => x.type === "Euro");
        break;
      default:
        temporaryAtms = this.state.atms;
        break;
    }
    this.setState({ filteredAtms: temporaryAtms });
    if (temporaryAtms.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    }
    this.handleSortChange(this.state.sortValue, this.state.sortDirection, temporaryAtms);
  }

  handleSortChange(value, direction, array) {
    let temporaryAtms = array == null ? this.state.filteredAtms : array.slice();
    switch (value) {
      case "Ir.sz.":
        direction =
          direction == null
            ? this.state.sortIconTableHead1 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead1: "bi bi-caret-up-fill" });
          temporaryAtms.sort((a, b) => (a.zip > b.zip ? -1 : 1));
        } else if (direction === "descending" || this.state.sortIconTableHead1 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead1: "bi bi-caret-down-fill" });
          temporaryAtms.sort((a, b) => (a.zip > b.zip ? 1 : -1));
        }
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead4: "bi bi-chevron-expand" });
        break;
      case "Település":
        direction =
          direction == null
            ? this.state.sortIconTableHead2 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead2: "bi bi-caret-up-fill" });
          temporaryAtms.sort(function (a, b) {
            if (a.city === b.city) {
              return a.zip > b.zip ? -1 : 1;
            }
            return a.city > b.city ? -1 : 1;
          });
        } else if (direction === "descending" || this.state.sortIconTableHead2 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead2: "bi bi-caret-down-fill" });
          temporaryAtms.sort(function (a, b) {
            if (a.city === b.city) {
              return a.zip > b.zip ? 1 : -1;
            }
            return a.city > b.city ? 1 : -1;
          });
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead4: "bi bi-chevron-expand" });
        break;
      case "Cím":
        direction =
          direction == null
            ? this.state.sortIconTableHead3 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead3: "bi bi-caret-up-fill" });
          temporaryAtms.sort((a, b) => (a.address > b.address ? -1 : 1));
        } else if (direction === "descending" || this.state.sortIconTableHead3 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead3: "bi bi-caret-down-fill" });
          temporaryAtms.sort((a, b) => (a.address > b.address ? 1 : -1));
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead4: "bi bi-chevron-expand" });
        break;
      case "Bankjegy":
        direction =
          direction == null
            ? this.state.sortIconTableHead4 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        if (direction === "ascending") {
          this.setState({ sortIconTableHead4: "bi bi-caret-up-fill" });
          temporaryAtms.sort(function (a, b) {
            if (a.type === b.type) {
              return a.zip > b.zip ? 1 : -1;
            }
            return a.type > b.type ? -1 : 1;
          });
        } else if (direction === "descending" || this.state.sortIconTableHead4 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead4: "bi bi-caret-down-fill" });
          temporaryAtms.sort(function (a, b) {
            if (a.type === b.type) {
              return a.zip > b.zip ? 1 : -1;
            }
            return a.type > b.type ? 1 : -1;
          });
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        break;
      default:
        temporaryAtms = array;
        break;
    }
    this.setState({ filteredAtms: temporaryAtms });
    this.setState({ sortDirection: direction });
    this.setState({ sortValue: value });
    if (temporaryAtms.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    }
  }

  async componentDidMount() {
    this.setState({ loadingText: constantsClass.TEXT_LOADING });
    const fetchedData = await this.context.getAtms();
    if (fetchedData.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    } else {
      this.setState({ atms: fetchedData });
      this.setState({ filteredAtms: fetchedData });
      this.setState({ tableStyleDisplay: "block" });
    }
  }

  render() {
    const filteredAtms2 = this.state.filteredAtms;
    return (
      <Fragment>
        {this.props.type !== "light" && (
          <BreadCrumbs
            data={[
              { name: "Főoldal", link: "/" },
              { name: "Bankautomaták", link: "" },
            ]}
          />
        )}
        <div className={this.props.type === "light" ? "" : "dashboard"}>
          <Row>
            <Col lg="12">
              <Card
                className={
                  this.props.type === "light"
                    ? "card netbank-card card-small"
                    : "card netbank-card"
                }
              >
                <FilterAtms onFilterChange={this.handleFilterChange} filter1="Összes" filter2="Forint" filter3="Euro" />
                <Card.Body className="pb-0">
                  <div className="d-flex flex-row">
                    <div className="card-icon d-flex align-items-center justify-content-center">
                      <i className="bi bi-cash-stack"></i>
                    </div>
                    <h5 className="card-title">
                      Bankautomaták<span> <i className="bi bi-filter"> </i>{this.state.filter}</span>
                    </h5>
                  </div>
                  <Table
                    striped
                    hover
                    responsive
                    className={
                      this.props.type === "light"
                        ? "table table-borderless datatable scrollableTable"
                        : "table table-borderless datatable"
                    }
                    style={this.props.type === "light" ? { display: this.state.tableStyleDisplay } : {}}
                  >
                    <TableHeadAtms
                      type={this.props.type}
                      onSortChange={this.handleSortChange}
                      col1="Ir.sz."
                      col2="Település"
                      col3="Cím"
                      col4="Bankjegy"
                      col5="Térkép"
                      sortIconTableHead1={this.state.sortIconTableHead1}
                      sortIconTableHead2={this.state.sortIconTableHead2}
                      sortIconTableHead3={this.state.sortIconTableHead3}
                      sortIconTableHead4={this.state.sortIconTableHead4}
                    />
                    {filteredAtms2.length === 0 && <p className={this.state.loadingTextClass}>{this.state.loadingText}</p>}
                    <tbody>
                      {filteredAtms2.map((a) => (
                        <TableRowAtms
                          key={a.id}
                          col1={a.zip}
                          col2={a.city}
                          col3={a.address}
                          col4={a.type}
                          col5="bi bi-cursor"
                          link={("https://www.google.com/maps/dir//" + a.latitude + "*" + a.longitude)
                            .replace(/,/g, ".")
                            .replace("*", ",")}
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

import React, { Fragment } from "react";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import TableHeadBranches from "./TableHeadBranches";
import TableRowBranches from "./TableRowBranches";
import FilterBranches from "./FilterBranches";
import { Row, Col, Table, Card } from "react-bootstrap";
import { ApiContext } from "../../../api/ApiProvider";
import * as constantsClass from "../../../assets/constant/constants";

export default class Branches extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      branches: [],
      filteredBranches: [],
      filter: "Összes",
      tableStyleDisplay: "",
      loadingText: "",
      loadingTextClass: "loading",
      sortIconTableHead1: "bi bi-chevron-expand",
      sortIconTableHead2: "bi bi-chevron-expand",
      sortIconTableHead3: "bi bi-chevron-expand",
      sortIconTableHead4: "bi bi-chevron-expand",
      sortValue: "",
      sortDirection: "ascending",
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleFilterChange(value) {
    this.setState({ filter: value });
    const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "numeric", minute: "numeric" });
    const today = new Date().getDay();
    let temporaryBranches = this.state.branches;
    switch (value) {
      case "Nyitva":
        switch (today) {
          case 0:
            temporaryBranches = this.state.branches.filter(
              (x) => currentTime >= x.openingtimesunday.split("-")[0] && currentTime <= x.openingtimesunday.split("-")[1]
            );
            break;
          case 1:
            temporaryBranches = this.state.branches.filter(
              (x) => currentTime >= x.openingtimemonday.split("-")[0] && currentTime <= x.openingtimemonday.split("-")[1]
            );
            break;
          case 2:
            temporaryBranches = this.state.branches.filter(
              (x) => currentTime >= x.openingtimetuesday.split("-")[0] && currentTime <= x.openingtimetuesday.split("-")[1]
            );
            break;
          case 3:
            temporaryBranches = this.state.branches.filter(
              (x) => currentTime >= x.openingtimewednesday.split("-")[0] && currentTime <= x.openingtimewednesday.split("-")[1]
            );
            break;
          case 4:
            temporaryBranches = this.state.branches.filter(
              (x) => currentTime >= x.openingtimethursday.split("-")[0] && currentTime <= x.openingtimethursday.split("-")[1]
            );
            break;
          case 5:
            temporaryBranches = this.state.branches.filter(
              (x) => currentTime >= x.openingtimefriday.split("-")[0] && currentTime <= x.openingtimefriday.split("-")[1]
            );
            break;
          case 6:
            temporaryBranches = this.state.branches.filter(
              (x) => currentTime >= x.openingtimesaturday.split("-")[0] && currentTime <= x.openingtimesaturday.split("-")[1]
            );
            break;
          default:
            break;
        }
        this.setState({ filteredBranches: temporaryBranches });
        if (temporaryBranches.length === 0) {
          this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
          this.setState({ loadingTextClass: "no-data" });
        }
        break;
      case "Zárva":
        switch (today) {
          case 0:
            temporaryBranches = this.state.branches.filter(
              (x) => currentTime <= x.openingtimesunday.split("-")[0] || currentTime >= x.openingtimesunday.split("-")[1]
            );
            break;
          case 1:
            temporaryBranches = this.state.branches.filter(
              (x) => currentTime <= x.openingtimemonday.split("-")[0] || currentTime >= x.openingtimemonday.split("-")[1]
            );
            break;
          case 2:
            temporaryBranches = this.state.branches.filter(
              (x) => currentTime <= x.openingtimetuesday.split("-")[0] || currentTime >= x.openingtimetuesday.split("-")[1]
            );
            break;
          case 3:
            temporaryBranches = this.state.branches.filter(
              (x) => currentTime <= x.openingtimewednesday.split("-")[0] || currentTime >= x.openingtimewednesday.split("-")[1]
            );
            break;
          case 4:
            temporaryBranches = this.state.branches.filter(
              (x) => currentTime <= x.openingtimethursday.split("-")[0] || currentTime >= x.openingtimethursday.split("-")[1]
            );
            break;
          case 5:
            temporaryBranches = this.state.branches.filter(
              (x) => currentTime <= x.openingtimefriday.split("-")[0] || currentTime >= x.openingtimefriday.split("-")[1]
            );
            break;
          case 6:
            temporaryBranches = this.state.branches.filter(
              (x) => currentTime <= x.openingtimesaturday.split("-")[0] || currentTime >= x.openingtimesaturday.split("-")[1]
            );
            break;
          default:
            break;
        }
        this.setState({ filteredBranches: temporaryBranches });
        if (temporaryBranches.length === 0) {
          this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
          this.setState({ loadingTextClass: "no-data" });
        }
        break;
      default:
        this.setState({ filteredBranches: temporaryBranches });
        break;
    }
    this.handleSortChange(this.state.sortValue, this.state.sortDirection, temporaryBranches);
  }

  handleSortChange(value, direction, array) {
    const today = new Date().getDay();
    let temporaryBranches = array == null ? this.state.filteredBranches : array.slice();
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
          temporaryBranches.sort((a, b) => (a.zip > b.zip ? -1 : 1));
        } else if (direction === "descending" || this.state.sortIconTableHead1 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead1: "bi bi-caret-down-fill" });
          temporaryBranches.sort((a, b) => (a.zip > b.zip ? 1 : -1));
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
          temporaryBranches.sort(function (a, b) {
            if (a.city === b.city) {
              return a.zip > b.zip ? -1 : 1;
            }
            return a.city > b.city ? -1 : 1;
          });
        } else if (direction === "descending" || this.state.sortIconTableHead2 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead2: "bi bi-caret-down-fill" });
          temporaryBranches.sort(function (a, b) {
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
          temporaryBranches.sort((a, b) => (a.address > b.address ? -1 : 1));
        } else if (direction === "descending" || this.state.sortIconTableHead3 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead3: "bi bi-caret-down-fill" });
          temporaryBranches.sort((a, b) => (a.address > b.address ? 1 : -1));
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead4: "bi bi-chevron-expand" });
        break;
      case "Mai nyitvatartás":
        direction =
          direction == null
            ? this.state.sortIconTableHead4 === "bi bi-caret-down-fill"
              ? "ascending"
              : "descending"
            : direction;
        temporaryBranches = temporaryBranches.map((obj) => ({ ...obj, openingtimetoday: obj.openingtimemonday }));
        switch (today) {
          case 0:
            temporaryBranches = temporaryBranches.map((obj) => ({ ...obj, openingtimetoday: obj.openingtimesunday }));
            break;
          case 1:
            temporaryBranches = temporaryBranches.map((obj) => ({ ...obj, openingtimetoday: obj.openingtimemonday }));
            break;
          case 2:
            temporaryBranches = temporaryBranches.map((obj) => ({ ...obj, openingtimetoday: obj.openingtimetuesday }));
            break;
          case 3:
            temporaryBranches = temporaryBranches.map((obj) => ({ ...obj, openingtimetoday: obj.openingtimewednesday }));
            break;
          case 4:
            temporaryBranches = temporaryBranches.map((obj) => ({ ...obj, openingtimetoday: obj.openingtimethursday }));
            break;
          case 5:
            temporaryBranches = temporaryBranches.map((obj) => ({ ...obj, openingtimetoday: obj.openingtimefriday }));
            break;
          case 6:
            temporaryBranches = temporaryBranches.map((obj) => ({ ...obj, openingtimetoday: obj.openingtimesaturday }));
            break;
          default:
            break;
        }
        if (direction === "ascending") {
          this.setState({ sortIconTableHead4: "bi bi-caret-up-fill" });
          temporaryBranches.sort(function (a, b) {
            if (a.openingtimetoday === b.openingtimetoday) {
              return a.zip > b.zip ? -1 : 1;
            }
            return a.openingtimetoday > b.openingtimetoday ? -1 : 1;
          });
        } else if (direction === "descending" || this.state.sortIconTableHead4 === "bi bi-chevron-expand") {
          this.setState({ sortIconTableHead4: "bi bi-caret-down-fill" });
          temporaryBranches.sort(function (a, b) {
            if (a.openingtimetoday === b.openingtimetoday) {
              return a.zip > b.zip ? -1 : 1;
            }
            return a.openingtimetoday > b.openingtimetoday ? 1 : -1;
          });
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        break;
      default:
        temporaryBranches = array;
        break;
    }
    this.setState({ filteredBranches: temporaryBranches });
    this.setState({ sortDirection: direction });
    this.setState({ sortValue: value });
    if (temporaryBranches.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    }
  }

  async componentDidMount() {
    this.setState({ loadingText: constantsClass.TEXT_LOADING });
    const fetchedData = await this.context.getBranches();
    if (fetchedData.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    } else {
      this.setState({ branches: fetchedData });
      this.setState({ filteredBranches: fetchedData });
      this.setState({ tableStyleDisplay: "block" });
    }
  }

  render() {
    const filteredBranches2 = this.state.filteredBranches;
    return (
      <Fragment>
        {this.props.type !== "light" && (
          <BreadCrumbs
            data={[
              { name: "Főoldal", link: "/" },
              { name: "Bankfiókok", link: "" },
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
                <FilterBranches
                  onFilterChange={this.handleFilterChange}
                  filter1="Összes"
                  filter2="Nyitva"
                  filter3="Zárva"
                ></FilterBranches>
                <Card.Body className="card-body pb-0">
                  <div className="d-flex flex-row">
                    <div className="card-icon d-flex align-items-center justify-content-center">
                      <i className="bi bi-bank2"></i>
                    </div>
                    <h5 className="card-title">
                      Bankfiókok<span> <i className="bi bi-filter"> </i>{this.state.filter}</span>
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
                    <TableHeadBranches
                      type={this.props.type}
                      onSortChange={this.handleSortChange}
                      col1="Ir.sz."
                      col2="Település"
                      col3="Cím"
                      col4="Mai nyitvatartás"
                      col5="Térkép"
                      sortIconTableHead1={this.state.sortIconTableHead1}
                      sortIconTableHead2={this.state.sortIconTableHead2}
                      sortIconTableHead3={this.state.sortIconTableHead3}
                      sortIconTableHead4={this.state.sortIconTableHead4}
                    />
                    <tbody>
                      {filteredBranches2.length === 0 && (
                        <p className={this.state.loadingTextClass}>{this.state.loadingText}</p>
                      )}
                      {filteredBranches2.map((b) => (
                        <TableRowBranches
                          key={b.id}
                          col1={b.zip}
                          col2={b.city}
                          col3={b.address}
                          openingtimesunday={b.openingtimesunday}
                          openingtimemonday={b.openingtimemonday}
                          openingtimetuesday={b.openingtimetuesday}
                          openingtimewednesday={b.openingtimewednesday}
                          openingtimethursday={b.openingtimethursday}
                          openingtimefriday={b.openingtimefriday}
                          openingtimesaturday={b.openingtimesaturday}
                          col5="bi bi-cursor"
                          link={("https://www.google.com/maps/dir//" + b.latitude + "*" + b.longitude)
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

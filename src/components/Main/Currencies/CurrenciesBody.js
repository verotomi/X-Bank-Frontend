import { ApiContext } from "../../../api/ApiProvider";
import { Col, Table, Card } from "react-bootstrap";
import * as constantsClass from "../../../assets/constant/constants";
import React, { Fragment } from "react";
import TableHeadCurrencies from "./TableHeadCurrencies";
import TableRowCurrencies from "./TableRowCurrencies";

export default class CurrenciesBody extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      loadingText: "",
      loadingTextClass: "loading",
      sortIconTableHead1: "bi bi-chevron-expand",
      sortIconTableHead2: "bi bi-chevron-expand",
      sortIconTableHead3: "bi bi-chevron-expand",
      sortIconTableHead4: "bi bi-chevron-expand",
    };
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleSortChange(value) {
    let temporaryCurrencies = this.state.currencies.slice();
    switch (value) {
      case "Valuta":
        if (this.state.sortIconTableHead1 === "bi bi-caret-down-fill") {
          this.setState({ sortIconTableHead1: "bi bi-caret-up-fill" });
          temporaryCurrencies.sort((a, b) => (a.name > b.name ? -1 : 1));
        } else if (
          this.state.sortIconTableHead1 === "bi bi-caret-up-fill" ||
          this.state.sortIconTableHead1 === "bi bi-chevron-expand"
        ) {
          this.setState({ sortIconTableHead1: "bi bi-caret-down-fill" });
          temporaryCurrencies.sort((a, b) => (a.name > b.name ? 1 : -1));
        }
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead4: "bi bi-chevron-expand" });
        break;
      case "Megnevezés":
        if (this.state.sortIconTableHead2 === "bi bi-caret-down-fill") {
          this.setState({ sortIconTableHead2: "bi bi-caret-up-fill" });
          temporaryCurrencies.sort((a, b) => (a.description > b.description ? -1 : 1));
        } else if (
          this.state.sortIconTableHead2 === "bi bi-caret-up-fill" ||
          this.state.sortIconTableHead2 === "bi bi-chevron-expand"
        ) {
          this.setState({ sortIconTableHead2: "bi bi-caret-down-fill" });
          temporaryCurrencies.sort((a, b) => (a.description > b.description ? 1 : -1));
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead4: "bi bi-chevron-expand" });
        break;
      case "Vétel":
        if (this.state.sortIconTableHead3 === "bi bi-caret-down-fill") {
          this.setState({ sortIconTableHead3: "bi bi-caret-up-fill" });
          temporaryCurrencies.sort((a, b) => (parseInt(a.buy) > parseInt(b.buy) ? -1 : 1));
        } else if (
          this.state.sortIconTableHead3 === "bi bi-caret-up-fill" ||
          this.state.sortIconTableHead3 === "bi bi-chevron-expand"
        ) {
          this.setState({ sortIconTableHead3: "bi bi-caret-down-fill" });
          temporaryCurrencies.sort((a, b) => (parseInt(a.buy) > parseInt(b.buy) ? 1 : -1));
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead4: "bi bi-chevron-expand" });
        break;
      case "Eladás":
        if (this.state.sortIconTableHead4 === "bi bi-caret-down-fill") {
          this.setState({ sortIconTableHead4: "bi bi-caret-up-fill" });
          temporaryCurrencies.sort((a, b) => (parseInt(a.sell) > parseInt(b.sell) ? -1 : 1));
        } else if (
          this.state.sortIconTableHead4 === "bi bi-caret-up-fill" ||
          this.state.sortIconTableHead4 === "bi bi-chevron-expand"
        ) {
          this.setState({ sortIconTableHead4: "bi bi-caret-down-fill" });
          temporaryCurrencies.sort((a, b) => (parseInt(a.sell) > parseInt(b.sell) ? 1 : -1));
        }
        this.setState({ sortIconTableHead1: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead2: "bi bi-chevron-expand" });
        this.setState({ sortIconTableHead3: "bi bi-chevron-expand" });
        break;
      default:
        temporaryCurrencies = this.state.atms;
        break;
    }
    this.setState({ currencies: temporaryCurrencies });
    if (temporaryCurrencies.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    }
  }

  async componentDidMount() {
    this.setState({ loadingText: constantsClass.TEXT_LOADING });
    const fetchedData = await this.context.getCurrencies();
    if (fetchedData.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    } else {
      this.setState({ currencies: fetchedData });
    }
  }

  render() {
    const { currencies } = this.state;
    return (
      <Fragment>
        <Col lg="12">
          <Card className="card netbank-card">
            <Card.Body className="card-body pb-0">
              <div className="d-flex flex-row">
                <div className="card-icon d-flex align-items-center justify-content-center">
                  <i className="bi bi-currency-euro"></i>
                </div>
                <h5 className="card-title">Valuta árfolyamok</h5>
              </div>
              <Table striped responsive hover className="table table-borderless datatable">
                <TableHeadCurrencies
                  onSortChange={this.handleSortChange}
                  col1="Valuta"
                  col2="Megnevezés"
                  col3="Vétel"
                  col4="Eladás"
                  col5="Érvényes"
                  sortIconTableHead1={this.state.sortIconTableHead1}
                  sortIconTableHead2={this.state.sortIconTableHead2}
                  sortIconTableHead3={this.state.sortIconTableHead3}
                  sortIconTableHead4={this.state.sortIconTableHead4}
                />
                {currencies.length === 0 && <p className={this.state.loadingTextClass}>{this.state.loadingText}</p>}
                <tbody>
                  {currencies.map((c) => (
                    <TableRowCurrencies key={c.id} col1={c.name} col2={c.description} col3={c.buy} col4={c.sell} col5={c.validfrom} />
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Fragment>
    );
  }
}

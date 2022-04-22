import { ApiContext } from "../../../api/ApiProvider";
import { Col, Table, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { translate, formatAmount, sessionExpired } from "../../../assets/script/scripts";
import { tryToLogout, showLoggedOutModal } from "../../../actions/actions";
import * as constantsClass from "../../../assets/constant/constants";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import React, { Fragment } from "react";
import TableHeadAccountBalances from "./TableHeadAccountBalances";
import TableRowAccountBalances from "./TableRowAccountBalances";

class AccountBalances extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      accountBalances: [],
      loadingText: "",
      loadingTextClass: "loading",
    };
  }

  async componentDidMount() {
    this.setState({ loadingText: constantsClass.TEXT_LOADING });
    const fetchedData = await this.context.getAccountBalances(this.props.id, this.props.token);
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(this.props);
    } else if (fetchedData.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    } else if (fetchedData.length > 0) {
      this.setState({ ...this.state, accountBalances: fetchedData });
    }
  }

  render() {
    const { accountBalances } = this.state;
    return (
      <Fragment>
        {this.props.type !== "light" && (
          <BreadCrumbs
            data={[
              { name: "Netbank", link: "/" },
              { name: "Számla egyenlegek", link: "" },
            ]}
          />
        )}
        <div className="dashboard">
          <Col lg="12">
            <Card className="card netbank-card">
              <Card.Body className="card-body pb-0">
                <div className="d-flex flex-row">
                  <div className="card-icon d-flex align-items-center justify-content-center">
                    <i className="bi bi-cash-coin"></i>
                  </div>
                  <h5 className="card-title">Bankszámlák</h5>
                </div>
                <Table striped responsive hover className="table table-borderless datatable">
                  <TableHeadAccountBalances col1="Számlaszám" col2="Típus" col3="Egyenleg" col4="Pénznem" col5="Állapot" />
                  <tbody>
                    {accountBalances.length === 0 && <p className={this.state.loadingTextClass}>{this.state.loadingText}</p>}
                    {accountBalances.map((a) => (
                      <TableRowAccountBalances
                        key={a.id}
                        col1={a.number}
                        col2={translate(a.type)}
                        col3={formatAmount(a.balance)}
                        col4={a.currency}
                        col5={translate(a.status)}
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountBalances);

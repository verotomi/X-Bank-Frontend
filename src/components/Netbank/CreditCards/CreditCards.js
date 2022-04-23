import { ApiContext } from "../../../api/ApiProvider";
import { Col, Table, Card, Badge } from "react-bootstrap";
import { connect } from "react-redux";
import { toggleEditCreditCardComponent } from "../../../actions/actions";
import { translate, formatCreditcardNumber, formatAmount, sessionExpired } from "../../../assets/script/scripts";
import { tryToLogout, showLoggedOutModal } from "../../../actions/actions";
import * as constantsClass from "../../../assets/constant/constants";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import EditCreditCard from "./EditCreditCard";
import React, { Fragment } from "react";
import TableHeadCreditCards from "./TableHeadCreditCards";
import TableRowCreditCards from "./TableRowCreditCards";

class CreditCardsBody extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      creditCards: [],
      actualCreditcard: "",
      loadingText: "",
      loadingTextClass: "loading",
    };
    this.handleCreditCardEdit = this.handleCreditCardEdit.bind(this);
    this.updateCreditcards = this.updateCreditcards.bind(this);
  }

  componentDidMount = async (e) => {
    this.setState({ loadingText: constantsClass.TEXT_LOADING });
    const fetchedData = await this.context.getCreditCards(this.props.id, this.props.token);
    if (fetchedData["error"] === "Lejárt token!") {
      sessionExpired(this.props);
    } else if (fetchedData.length === 0) {
      this.setState({ loadingText: constantsClass.TEXT_NO_DATA });
      this.setState({ loadingTextClass: "no-data" });
    } else if (fetchedData.length > 0) {
      this.setState({ ...this.state, creditCards: fetchedData });
    }
  };

  componentWillUnmount() {
    if (this.props.isEditCreditCardComponentOpen) {
      this.props.toggleEditCreditCardComponent();
    }
  }

  handleCreditCardEdit(e, a) {
    e.preventDefault(e);
    this.state.creditCards.findIndex((x) => x.creditcard_id === a.creditcard_id);
    if (this.state.actualCreditcard === []) {
      this.props.toggleEditCreditCardComponent();
    } else {
      if (this.state.actualCreditcard.creditcard_id !== a.creditcard_id && this.props.isEditCreditCardComponentOpen) {
      } else {
        this.props.toggleEditCreditCardComponent();
      }
    }
    this.setState({ actualCreditcard: a });
  }

  updateCreditcards(creditCards) {
    this.setState({ creditCards: creditCards });
  }

  render() {
    const { creditCards } = this.state;
    return (
      <Fragment>
        {this.props.type !== "light" && (
          <BreadCrumbs
            data={[
              { name: "Netbank", link: "/" },
              { name: "Bankkártyák", link: "" },
            ]}
          />
        )}
        <div className="dashboard">
          <Col lg="12">
            <Card className="card netbank-card">
              <Card.Body className="card-body pb-0">
                <div className="d-flex flex-row">
                  <div className="card-icon d-flex align-items-center justify-content-center">
                    <i className="bi bi-credit-card"></i>
                  </div>
                  <h5 className="card-title">Bankkártyák</h5>
                </div>
                <Table striped responsive hover className="table table-borderless datatable">
                  <TableHeadCreditCards
                    type="light"
                    col1="Kártyaszám"
                    col2="Típus"
                    col3="Érvényesség"
                    col4="Állapot"
                    col5="Kapcsolódó számlaszám"
                    col6="Elérhető összeg"
                    col7={this.props.type === "light" ? "Pénznem" : ""}
                  />
                  {creditCards.length === 0 && <p className={this.state.loadingTextClass}>{this.state.loadingText}</p>}
                  <tbody>
                    {creditCards.map((a) => (
                      <TableRowCreditCards
                        type="light"
                        key={a.creditcard_id}
                        col1={formatCreditcardNumber(a.creditcard_number)}
                        col2={a.creditcard_type}
                        col3={a.expire_date}
                        col4={translate(a.credit_card_status)}
                        col5={a.number}
                        col6={formatAmount(a.balance) + " " + a.currency}
                        col7={
                          this.props.type === "light" ? (
                            a.currency
                          ) : (
                            <h5>
                              <Badge onClick={(e) => this.handleCreditCardEdit(e, a)} className="btn badge bg-success">
                                <i className="bi bi-gear"></i>{window.innerWidth > 599 && " Kártya kezelése"}
                              </Badge>
                            </h5>
                          )
                        }
                      />
                    ))}
                  </tbody>
                </Table>
                {this.props.isEditCreditCardComponentOpen && (
                  <EditCreditCard
                    key={this.state.actualCreditcard.id}
                    updateCreditcards={this.updateCreditcards}
                    selectorDefaultValue={
                      translate(this.state.actualCreditcard.type) +
                      " - " +
                      this.state.actualCreditcard.number +
                      " - " +
                      formatAmount(this.state.actualCreditcard.balance) +
                      " " +
                      this.state.actualCreditcard.currency
                    }
                    creditCard={this.state.actualCreditcard}
                  ></EditCreditCard>
                )}
              </Card.Body>
            </Card>
          </Col>
        </div>
      </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardsBody);

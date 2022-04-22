import { ApiContext } from "../../../api/ApiProvider";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";
import { toggleEditCreditCardComponent, updateAccountsAction, updateSavingsAction } from "../../../actions/actions";
import AccountBalances from "../AccountBalances/AccountBalances";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import CreditCardsBody from "../CreditCards/CreditCards";
import React, { Fragment } from "react";
import Savings from "../Savings/Savings";

class NetbankOverview extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      savings: [],
      filteredSavings: [],
      creditCards: [],
      filter: "Összes",
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(value) {
    this.setState({ filteredSavings: this.state.savings });
    this.setState({ filter: value });
    switch (value) {
      case "Aktív":
        this.setState({ filteredSavings: this.state.savings.filter((x) => x.saving_status === "Active") });
        break;
      case "Lejárt":
        this.setState({ filteredSavings: this.state.savings.filter((x) => x.saving_status === "Expired") });
        break;
      case "Feltört":
        this.setState({ filteredSavings: this.state.savings.filter((x) => x.saving_status === "Breaked") });
        break;
      default:
        this.setState({ filteredSavings: this.state.savings });
        break;
    }
  }

  componentDidMount() {
    if (this.props.isEditCreditCardComponentOpen) {
      this.props.toggleEditCreditCardComponent();
    }
    this.context.getAccountBalances(this.props.id, this.props.token).then((accounts) => {
      this.setState({ ...this.state, accounts: accounts });
      this.props.updateAccountsAction(accounts);
    });
  }

  render() {
    return (
      <Fragment>
        <BreadCrumbs
          data={[
            { name: "Netbank", link: "/" },
            { name: "Áttekintés", link: "" },
          ]}
        />
        <div className="dashboard">
          <Col lg="12">
            <AccountBalances type="light" />
            <Savings type="light" />
            <CreditCardsBody type="light" />
          </Col>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  updateAccountsAction,
  updateSavingsAction,
  toggleEditCreditCardComponent,
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(NetbankOverview);

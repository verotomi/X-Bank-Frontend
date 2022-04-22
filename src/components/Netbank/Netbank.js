import { ApiContext } from "../../api/ApiProvider";
import { connect } from "react-redux";
import { IdleTimeOutModal } from "../../modals/IdleModal";
import { Navigate, Route, Routes } from "react-router-dom";
import { tryToLogout, showLoggedOutModal } from "../../actions/actions";
import AccountBalances from "./AccountBalances/AccountBalances";
import BeneficiariesList from "./Beneficiaries/Beneficiaries";
import CreditCards from "./CreditCards/CreditCards";
import EditBeneficiary from "./Beneficiaries/EditBeneficiary";
import EditRecurringTransfer from "./RecurringTransfers/EditRecurringTransfer";
import Footer from "../Shared/Footer";
import History from "./History/History";
import IdleTimer from "react-idle-timer";
import NetbankHeader from "./NetbankHeader";
import NetbankOverview from "./NetbankOverview/NetbankOverview";
import NetbankSidebar from "./NetbankSidebar";
import NewBeneficiary from "./Beneficiaries/NewBeneficiary";
import NewRecurringTransfer from "./RecurringTransfers/NewRecurringTransfer";
import NewSaving from "./Savings/NewSaving";
import React, { Fragment } from "react";
import Savings from "./Savings/Savings";
import Statements from "./Statements/Statements";
import Statistics from "./Statistics/Statistics";
import TransferOneTime from "./TransferOneTime/TransferOneTime";
import { TIMEOUT } from "../../assets/config/config";
import RecurringTransfers from "./RecurringTransfers/RecurringTransfers";

class Netbank extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      timeout: TIMEOUT,
      showModal: false,
      userLoggedIn: false,
      isTimedOut: false,
    };
    this.idleTimer = null;
    this.onAction = this.onAction.bind(this);
    this.onActive = this.onActive.bind(this);
    this.onIdle = this.onIdle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  onAction(e) {
    this.setState({ isTimedOut: false });
  }

  onActive(e) {
    this.setState({ isTimedOut: false });
  }

  async onIdle(e) {
    const isTimedOut = this.state.isTimedOut;
    if (isTimedOut) {
      const fetchedData = await this.context.logoutUser(
        {
          id_user: this.props.id,
          netbank_id: this.props.netbank_id,
        },
        this.props.token
      );
      if (!fetchedData["error"]) {
        this.setState({ showModal: false });
        this.props.showLoggedOutModal("Ön egy ideje nem végzett semmilyen műveletet, ezért ki lett léptetve.");
        sessionStorage.clear();
        this.props.tryToLogout();
      }
    } else {
      this.setState({ showModal: true });
      this.idleTimer.reset();
      this.setState({ isTimedOut: true });
    }
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  async handleLogout(e) {
    e.preventDefault();
    const fetchedData = await this.context.logoutUser(
      {
        id_user: this.props.id,
        netbank_id: this.props.netbank_id,
      },
      this.props.token
    );
    if (!fetchedData["error"]) {
      this.setState({ showModal: false });
      sessionStorage.clear();
      this.props.tryToLogout();
    }
  }

  render() {
    return (
      <Fragment>
        <IdleTimer
          ref={(ref) => {
            this.idleTimer = ref;
          }}
          element={document}
          onActive={this.onActive}
          onIdle={this.onIdle}
          onAction={this.onAction}
          debounce={250}
          timeout={this.state.timeout}
        />
        <div className={this.props.isSidebarClose ? "toggle-sidebar" : ""}>
          <NetbankHeader />
          <NetbankSidebar />
          <main id="main" className="main">
            <Routes>
              <Route path="/" element={this.props.netbank_id === "admin001" ? <Statistics /> : <NetbankOverview />} />
              <Route path="attekintes" element={<NetbankOverview />} />
              <Route path="/egyenleglekerdezes" element={<AccountBalances />} />
              <Route path="egyszeriutalas" element={<TransferOneTime />} />
              <Route path="allandomegbizasok" element={<RecurringTransfers />} />
              <Route path="ujallandomegbizas" element={<NewRecurringTransfer />} />
              <Route path="megtakaritasok" element={<Savings />} />
              <Route path="ujmegtakaritas" element={<NewSaving />} />
              <Route path="szamlatortenet" element={<History />} />
              <Route path="szamlakivonatok" element={<Statements />} />
              <Route path="bankkartyak" element={<CreditCards />} />
              <Route path="kedvezmenyezettek" element={<BeneficiariesList />} />
              <Route path="ujkedvezmenyezett" element={<NewBeneficiary />} />
              <Route path="kedvezmenyezettmodositas" element={<EditBeneficiary />} />
              <Route path="allandomegbizasmodositas" element={<EditRecurringTransfer />} />
              <Route path="statisztika" element={<Statistics />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
          <IdleTimeOutModal showModal={this.state.showModal} handleClose={this.handleClose} handleLogout={this.handleLogout} />
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  tryToLogout,
  showLoggedOutModal,
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(Netbank);

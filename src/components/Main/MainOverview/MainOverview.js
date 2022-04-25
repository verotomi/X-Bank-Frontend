import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import MobilebankAd from "../MobilebankAd/MobilebankAd";
import ForeignCurrenciesBodyLight from "../ForeignCurrencies/ForeignCurrenciesBodyLight";
import CurrenciesBodyLight from "../Currencies/CurrenciesBodyLight";
import Atms from "../Atms/Atms";
import Branches from "../Branches/Branches";
import { LoggedOutModal } from "../../../modals/LoggedOutModal";
import { connect } from "react-redux";
import { hideLoggedOutModal } from "../../../actions/actions";

/**
 * A bejelentkezés nélkül elérhető felület áttekintő oldala
 */
class MainOverview extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.hideLoggedOutModal();
  }

  render() {
    return (
      <Fragment>
        <BreadCrumbs data={[{ name: "Főoldal", link: "" }]} />
        <div className="dashboard">
          <Row>
            <Col lg="7">
              <Branches type="light" />
              <Atms type="light" />
            </Col>
            <Col lg="5">
              <CurrenciesBodyLight />
              <ForeignCurrenciesBodyLight />
            </Col>
            <MobilebankAd type="light" colWidth='lg="1"' />
          </Row>
        </div>
        <LoggedOutModal
          showModal={this.props.showLoggedOutModal}
          handleClose={this.handleClose}
          text={this.props.loggedOutModalText}
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  hideLoggedOutModal,
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(MainOverview);

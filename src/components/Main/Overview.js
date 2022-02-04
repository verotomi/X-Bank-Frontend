import React, { Fragment } from "react";
import xbankMobileImage from '../../assets/img/xbank_androidapp.png';
import TableHead from '../Shared/TableHead';
import TableRow from '../Shared/TableRow';
import Filter from '../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../Shared/BreadCrumbs";
import AtmsBodyFiltered from "./Atms/AtmsBodyFiltered";
import Branches from "./Branches/Branches";
import BranchesBodyFiltered from "./Branches/BranchesBodyFiltered";
import CurrenciesBodyFiltered from "./Currencies/CurrenciesBodyFiltered";
import ForeignCurrenciesBodyFiltered from "./ForeignCurrencies/ForeignCurrenciesBodyFiltered";
import MobilebankAd from "./MobilebankAd";

export default class Overview extends React.Component {
  render() {
    return <Fragment>
      <BreadCrumbs data={[{name:"Főoldal", link:""}]}/>
      <div className="dashboard">
        <Row>
          <Col lg="7">
            <Row>
              <BranchesBodyFiltered />
              <AtmsBodyFiltered />
              <MobilebankAd />
            </Row>
          </Col>
          <Col lg="5">
            <Row>
              <CurrenciesBodyFiltered/>
              <ForeignCurrenciesBodyFiltered/>
            </Row>
          </Col>
        </Row>
      </div>
    </Fragment>;
  }
}
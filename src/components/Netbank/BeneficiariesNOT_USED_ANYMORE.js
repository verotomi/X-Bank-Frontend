import React, { Fragment } from "react";
import xbankMobileImage from '../../assets/img/xbank_androidapp.png';
import TableHead from '../Shared/TableHead';
import TableRow from '../Shared/TableRow';
import Filter from '../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../Shared/BreadCrumbs";

export default class Beneficiaries extends React.Component {
  render() {
    return <Fragment>
        <BreadCrumbs name="Kedvezményezettek"/>

      <div className="dashboard">
        <Row>
          <Col lg="12">
            
                <h4>Kedvezményezettek</h4>
              </Col>
              
            </Row>


      </div>
    </Fragment>;
  }
}


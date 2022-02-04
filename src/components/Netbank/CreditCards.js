import React, { Fragment } from "react";
import xbankMobileImage from '../../assets/img/xbank_androidapp.png';
import TableHead from '../Shared/TableHead';
import TableRow from '../Shared/TableRow';
import Filter from '../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../Shared/BreadCrumbs";

export default class CreditCards extends React.Component {
  render() {
    return <Fragment>
        <BreadCrumbs data={[{name:"Netbank", link:"/"}, {name:"Bankkártyák", link:""}]}/>


      <div className="dashboard">
        <Row>
          <Col lg="12">
            
                <h4>Bankkártyák</h4>
              </Col>
              
            </Row>


      </div>
    </Fragment>;
  }
}



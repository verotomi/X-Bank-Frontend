import React, { Fragment } from "react";
  import TableHead from '../../Shared/TableHead';
import TableRow from '../../Shared/TableRow';
import Filter from '../../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";

export default class NewBeneficiary extends React.Component {
  render() {
    return <Fragment>
        <BreadCrumbs data={[{name:"Netbank", link:"/"}, {name:"Kedvezményezettek", link:""},{name:"Új kedvezényezett", link:""}]}/>

      <div className="dashboard">
        <Row>
          <Col lg="12">
            
                <h4>Új kedvezményezett</h4>
              </Col>
              
            </Row>


      </div>
    </Fragment>;
  }
}



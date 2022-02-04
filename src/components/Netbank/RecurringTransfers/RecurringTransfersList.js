import React, { Fragment } from "react";
import TableHead from '../../Shared/TableHead';
import TableRow from '../../Shared/TableRow';
import Filter from '../../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";

export default class RecurringTransfersList extends React.Component {
  render() {
    return <Fragment>
        <BreadCrumbs data={[{name:"Netbank", link:"/"}, {name:"Állandó megbízások", link:""},{name:"Állandó megbízások listája", link:""}]}/>

      <div className="dashboard">
        <Row>
          <Col lg="12">
            
                <h4>Állandó megbízások</h4>
              </Col>
              
            </Row>


      </div>
    </Fragment>;
  }
}



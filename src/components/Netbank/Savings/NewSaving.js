import React, { Fragment } from "react";
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";

export default class NewSaving extends React.Component {
  render() {
    return <Fragment>
        <BreadCrumbs data={[{name:"Netbank", link:"/"}, {name:"Megtakarítások", link:""}, {name:"Megtakarítások listája", link:""}]}/>


      <div className="dashboard">
        <Row>
          <Col lg="12">
            
                <h4>Új megtakarítás</h4>
              </Col>
              
            </Row>


      </div>
    </Fragment>;
  }
}



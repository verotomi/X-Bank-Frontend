import React, { Fragment } from "react";
import xbankMobileImage from '../../assets/img/xbank_androidapp.png';
import TableHead from '../Shared/TableHead';
import TableRow from '../Shared/TableRow';
import Filter from '../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../Shared/BreadCrumbs";

export default class MobilebankAd extends React.Component {
  render() {
    return <Fragment>
        <BreadCrumbs data={[{name:"Főoldal", link:"/"}, {name:"Mobilbank", link:""}]}/>

      <div className="dashboard">
        <Row>
          <Col lg="12">
            
          <Card className="card">
                  <Card.Body className="card-body pb-0">
                    <Card.Title><h5 className="card-title">Android alkalmazás</h5></Card.Title>
                    <Card.Text className="news">
                      <div className="post-item clearfix">
                        <img src={xbankMobileImage} alt="" />
                        <h4><a href="#">Töltse le mobilbank alkalmazásunkat!</a></h4>
                        <p>Ingyenes mobilbank alkalmazásunkkal bárhol és bármikor intézheti banki ügyeit. Egyszerű telepítés, ujjlenyomatos azonosítás, interaktív bankfiók - és ATM adatok, Élő valuta- és deviza árfolyamok.</p>
                        <p><a href="https://drive.google.com/file/d/1n2j4QzZ8ip9A7f9PZx8JH_mqgCH3WOLL/view?usp=sharing">Letöltés</a></p>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              
            </Row>


      </div>
    </Fragment>;
  }
}



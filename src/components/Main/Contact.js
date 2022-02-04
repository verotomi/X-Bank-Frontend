import React, { Fragment } from "react";
import xbankMobileImage from '../../assets/img/xbank_androidapp.png';
import TableHead from '../Shared/TableHead';
import TableRow from '../Shared/TableRow';
import Filter from '../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../Shared/BreadCrumbs";

export default class Contact extends React.Component {
  render() {
    return <Fragment>
      <BreadCrumbs data={[{name:"Főoldal", link:"/"}, {name:"Kapcsolat", link:""}]}/>

        <div className="dashboard">
        <Row>
        <Col lg="12">
            
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Központ címe:</h5>
                X Bank Limited<br />
                Cím: 1013 Budapest, Lánchíd utca 2.<br />
                Telefonszám: +36-20-289-0955<br />
               </div>
            </div>

          <Col lg="12">
            
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Telefonszámok:</h5>
                Központi iroda: +36-20/289-0955<br />
                Bankkártya forródrót (0-24h): +36-20/289-0955<br />
            </div>
          </div>
           </Col>  

      
             </Col>  
           
             <Col lg="12">
            
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Postázási cím:</h5>
                X Bank Limited<br />
                Cím: 1560 Budapest, Postafiók 23.<br />
              </div>
            </div>
             </Col>  

            <Col lg="12">  
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Elektronikus elérhetőségek:</h5>
                  Weboldal: www.xbank.hu<br />
                  E-mail címek:<br />
                  - általános információ: info@xbank.hu <br />
                  - bankkártyával kapcsolatos kérdések: creditcard@xbank.hu<br />
                Facebook: <a href="https://www.facebook.com/X-Bank-378694379633392">X Bank</a><br />
                </div>
              </div>
            </Col>  

            </Row>


      </div>
    </Fragment>;
  }
}



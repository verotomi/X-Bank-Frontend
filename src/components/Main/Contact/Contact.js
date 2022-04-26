import React, { Fragment } from "react";
import { Row, Col, Card } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";

/**
 * A kapcsolati adatok megjelenítése
 */
export default class Contact extends React.Component {
  render() {
    return (
      <Fragment>
        <BreadCrumbs
          data={[
            { name: "Főoldal", link: "/" },
            { name: "Kapcsolat", link: "" },
          ]}
        />
        <div className="dashboard">
          <Row>
            <Col lg="12">
              <Card className="card netbank-card netbank-form">
                <Card.Body className="card-body pb-0">
                  <div className="d-flex flex-row">
                    <div className="card-icon d-flex align-items-center justify-content-center">
                      <i className="bi bi-map"></i>
                    </div>
                    <h5 className="card-title">Központ címe</h5>
                  </div>
                  <label htmlFor="selectSourceAccountNumber" className="form-label first-label">
                    A Bank központi címe
                  </label>
                  <p className="noIndent">
                    Cég neve: X Bank Limited
                    <br />
                    Cég címe: 1013 Budapest, Lánchíd utca 2.
                  </p>
                  <iframe
                    title="headOffice"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.6839252074883!2d19.03977161594062!3d47.49607047917746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc3ea9e417c1%3A0xbc45f82af9ccaae9!2zQnVkYXBlc3QsIEzDoW5jaMOtZCB1LiAyLCAxMDEz!5e0!3m2!1shu!2shu!4v1646122223148!5m2!1shu!2shu"
                    style={{ width: "100%", height: 300, padding: "1.5em", allowfullscreen: "", loading: "lazy" }}
                  ></iframe>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="12">
              <Card className="card netbank-card netbank-form">
                <Card.Body className="card-body pb-0">
                  <div className="d-flex flex-row">
                    <div className="card-icon d-flex align-items-center justify-content-center">
                      <i className="bi bi-telephone"></i>
                    </div>
                    <h5 className="card-title">Telefonszámok</h5>
                  </div>
                  <label htmlFor="selectSourceAccountNumber" className="form-label first-label">
                    Telefonos elérhetőségek
                  </label>
                  <p className="noIndent">
                    Központi iroda: +36-20/289-0955
                    <br />
                    Bankkártya forródrót (0-24h): +36-20/289-0955
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="12">
              <Card className="card netbank-card netbank-form">
                <Card.Body className="card-body pb-0">
                  <div className="d-flex flex-row">
                    <div className="card-icon d-flex align-items-center justify-content-center">
                      <i className="bi bi-envelope"></i>
                    </div>
                    <h5 className="card-title">Postázási cím</h5>
                  </div>
                  <label htmlFor="selectSourceAccountNumber" className="form-label first-label">
                    Postafiók adatok
                  </label>
                  <p className="noIndent">
                    X Bank Limited
                    <br />
                    Budapest
                    <br />
                    Postafiók 23.
                    <br />
                    1560
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="12">
              <Card className="card netbank-card netbank-form">
                <Card.Body className="card-body pb-0">
                  <div className="d-flex flex-row">
                    <div className="card-icon d-flex align-items-center justify-content-center">
                      <i className="bi bi-at"></i>
                    </div>
                    <h5 className="card-title">Elektronikus elérhetőségek</h5>
                  </div>
                  <label htmlFor="selectSourceAccountNumber" className="form-label first-label">
                    Elektronikus kapcsolatfelvételi lehetőségek
                  </label>
                  <p className="noIndent">
                    Weboldal:{" "}
                    <a target="_blank" rel="noreferrer" href="https://www.verovszki.eu/xbank/">
                      www.xbank.hu
                    </a>
                    <br />
                    Általános információ: <a href="mailto:creditcard@xbank.hu">info@xbank.hu</a>
                    <br />
                    Bankkártyával kapcsolatos kérdések: <a href="mailto:creditcard@xbank.hu">creditcard@xbank.hu</a>
                    <br />
                    Facebook:{" "}
                    <a target="_blank" rel="noreferrer" href="https://www.facebook.com/X-Bank-378694379633392">
                      X Bank
                    </a>
                    <br />{" "}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

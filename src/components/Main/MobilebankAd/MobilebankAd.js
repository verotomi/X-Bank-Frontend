import React, { Fragment } from "react";
import xbankMobileImage from "../../../assets/img/xbank_androidapp.png";
import { Row, Col, Card } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import { MOBILEAPP_DOWNLOAD_LOCATION } from "../../../assets/config/config";

export default class MobilebankAd extends React.Component {
  render() {
    return (
      <Fragment>
        {this.props.type !== "light" && (
          <BreadCrumbs
            data={[
              { name: "Főoldal", link: "/" },
              { name: "Mobilbank", link: "" },
            ]}
          />
        )}
        <div className="dashboard">
          <Row>
          <div className={this.props.type === "light" ? "" : "dashboard"}>
              <Row>
                <Col lg="12">
                  <Card className="card netbank-card netbank-form">
                    <Card.Body className="card-body pb-0">
                      <div className="d-flex flex-row">
                        <div className="card-icon d-flex align-items-center justify-content-center">
                          <i className="bi bi-phone"></i>
                        </div>
                        <h5 className="card-title">Android alkalmazás</h5>
                      </div>
                      <label htmlFor="selectSourceAccountNumber" className="form-label first-label">
                        Elérhető bankunk androidos alkalmazása
                      </label>
                      <Card.Text className="mobilebank-ad">
                        <div className="post-item clearfix">
                          <img id="mobileBankImage" src={xbankMobileImage} alt="" />
                          <h4>
                            <a
                              href="https://drive.google.com/file/d/1n2j4QzZ8ip9A7f9PZx8JH_mqgCH3WOLL/view?usp=sharing"
                              rel="noreferrer"
                              target="_blank"
                            >
                              Töltse le mobilbank alkalmazásunkat!
                            </a>
                          </h4>
                          <p>
                            Ingyenes mobilbank alkalmazásunkkal bárhol és bármikor intézheti banki ügyeit. Egyszerű telepítés,
                            ujjlenyomatos azonosítás, interaktív bankfiók - és ATM adatok, élő valuta- és deviza árfolyamok.
                          </p>
                          <p>
                            <a
                              className="button btn btn-secondary"
                              href={MOBILEAPP_DOWNLOAD_LOCATION}
                              rel="noreferrer"
                              target="_blank"
                            >
                              Letöltés
                            </a>
                          </p>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Row>
        </div>
      </Fragment>
    );
  }
}

import React, { Fragment } from "react";
import xbankMobileImage from '../../assets/img/xbank_androidapp.png';
import TableHead from '../Shared/TableHead';
import TableRow from '../Shared/TableRow';
import Filter from '../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";

export default class NetbankBody extends React.Component {
  render() {
    return <Fragment>
      <div className="dashboard">
        <Row>
          <Col lg="7">
            <Row>
              <Col lg="12">
                <Card className="card info-card revenue-card top-selling">
                  <Filter filter1="Összes" filter2="Nyitva" filter3="Zárva"></Filter>
                  <Card.Body className="card-body pb-0">
                    <Card.Title>
                      <div className="d-flex flex-row">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-bank2"></i>
                        </div>
                        <h5 className="card-title">Bankfiókok<span> | Összes</span></h5>
                      </div>
                    </Card.Title>
                    <Table className="table table-borderless datatable">
                      <TableHead col1="Fiók" col2="Irányítószám" col3="Város" col4="Cím" col5="Nyitva" col6="Térkép"/>
                      <tbody>
                        <TableRow col1="1.sz. Fiók" col2="1051" col3="Budapest" col4="Deák tér 1." col5="Nyitva" col6="bi bi-cursor"/>
                        <TableRow col1="2.sz. Fiók" col2="1137" col3="Budapest" col4="Szent István krt. 10." col5="Nyitva" col6="bi bi-cursor"/>
                        <TableRow col1="3.sz. Fiók" col2="1044" col3="Budapest" col4="Fóti út 4." col5="Nyitva" col6="bi bi-cursor"/>
                        <TableRow col1="4.sz. Fiók" col2="1032" col3="Budapest" col4="Vörösvári út 22." col5="Nyitva" col6="bi bi-cursor"/>
                        <TableRow col1="5.sz. Fiók" col2="1211" col3="Budapest" col4="Pusztaszeri út 67." col5="Nyitva" col6="bi bi-cursor"/>
                        <TableRow col1="8.sz. Fiók" col2="1086" col3="Budapest" col4="Baross utca 124." col5="Zárva" col6="bi bi-cursor"/>
                        <TableRow col1="9.sz. Fiók" col2="1013" col3="Budapest" col4="Lánchíd utca 8." col5="Zárva" col6="bi bi-cursor"/>
                        <TableRow col1="10.sz. Fiók" col2="1212" col3="Budapest" col4="Kossuth Lajos utca 50." col5="Nyitva" col6="bi bi-cursor"/>
                        <TableRow col1="14.sz. Fiók" col2="1077" col3="Budapest" col4="Wesselényi utca 17." col5="Nyitva" col6="bi bi-cursor"/>
                        <TableRow col1="15.sz. Fiók" col2="1165" col3="Budapest" col4="Veres Péter út 145." col5="Nyitva" col6="bi bi-cursor"/>
                        <TableRow col1="17.sz. Fiók" col2="1182" col3="Budapest" col4="Péterhalmi út 8." col5="Zárva" col6="bi bi-cursor"/>
                        <TableRow col1="18.sz. Fiók" col2="1238" col3="Budapest" col4="Grassalkovich út 70." col5="Nyitva" col6="bi bi-cursor"/>
                        <TableRow col1="21.sz. Fiók" col2="1144" col3="Budapest" col4="Füredi utca 19." col5="Nyitva" col6="bi bi-cursor"/>
                        <TableRow col1="22.sz. Fiók" col2="1154" col3="Budapest" col4="Szentmihályi út 152." col5="Nyitva" col6="bi bi-cursor"/>
                        <TableRow col1="23.sz. Fiók" col2="1173" col3="Budapest" col4="Pesti út 222." col5="Nyitva" col6="bi bi-cursor"/>
                        <TableRow col1="24.sz. Fiók" col2="1195" col3="Budapest" col4="Vas Gereben utca 11." col5="Nyitva" col6="bi bi-cursor"/>
                        <TableRow col1="30.sz. Fiók" col2="2120" col3="Dunakeszi" col4="Fő út 10." col5="Zárva" col6="bi bi-cursor"/>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg="12">
                <Card className="card info-card revenue-card top-selling">
                  <Filter filter1="Összes" filter2="Forint" filter3="Euro"></Filter>
                  <Card.Body className="card-body pb-0">
                    <Card.Title>
                      <div className="d-flex flex-row">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cash-stack"></i>
                        </div>
                        <h5 className="card-title">Bankautomaták<span> | Összes</span></h5>
                      </div>
                    </Card.Title>
                    <Table className="table table-borderless datatable">
                      <TableHead col1="Irányítószám" col2="Település" col3="Cím" col4="Bankjegy" col6="Térkép"/>
                      <tbody>
                        <TableRow col1="1011" col2="Budapest" col3="Deák tér 1." col4="Forint" col6="bi bi-cursor"/>
                        <TableRow col1="1022" col2="Budapest" col3="Pasaréti u 32." col4="Forint" col6="bi bi-cursor"/>
                        <TableRow col1="1034" col2="Budapest" col3="Lajos utca 36." col4="Forint" col6="bi bi-cursor"/>
                        <TableRow col1="1044" col2="Budapest" col3="Megyeri út 123." col4="Forint" col6="bi bi-cursor"/>
                        <TableRow col1="1051" col2="Budapest" col3="BAnk utca 1." col4="Forint" col6="bi bi-cursor"/>
                        <TableRow col1="1062" col2="Budapest" col3="Fóti út 4." col4="Forint" col6="bi bi-cursor"/>
                        <TableRow col1="1077" col2="Budapest" col3="Vörösvári út 22." col4="Euro" col6="bi bi-cursor"/>
                        <TableRow col1="1086" col2="Budapest" col3="Pusztaszeri út 67." col4="Forint" col6="bi bi-cursor"/>
                        <TableRow col1="1105" col2="Budapest" col3="Baross utca 124." col4="Forint" col6="bi bi-cursor"/>
                        <TableRow col1="1111" col2="Budapest" col3="Lánchíd utca 8." col4="Euro" col6="bi bi-cursor"/>
                        <TableRow col1="1122" col2="Budapest" col3="Kossuth Lajos utca 50." col4="Forint" col6="bi bi-cursor"/>
                        <TableRow col1="1144" col2="Budapest" col3="Wesselényi utca 17." col4="Forint" col6="bi bi-cursor"/>
                        <TableRow col1="1157" col2="Budapest" col3="Veres Péter út 145." col4="Forint" col6="bi bi-cursor"/>
                        <TableRow col1="1165" col2="Budapest" col3="Péterhalmi út 8." col4="Forint" col6="bi bi-cursor"/>
                        <TableRow col1="1172" col2="Budapest" col3="Grassalkovich út 70." col4="Forint" col6="bi bi-cursor"/>
                        <TableRow col1="1188" col2="Budapest" col3="Füredi utca 19." col4="Forint" col6="bi bi-cursor"/>
                        <TableRow col1="1210" col2="Budapest" col3="Szentmihályi út 152." col4="Forint" col6="bi bi-cursor"/>
                        <TableRow col1="1222" col2="Budapest" col3="Pesti út 222." col4="Forint" col6="bi bi-cursor"/>
                        <TableRow col1="1238" col2="Budapest" col3="Vas Gereben utca 11." col4="Forint" col6="bi bi-cursor"/>
                        <TableRow col1="2120" col2="Dunakeszi" col3="Fő út 10." col4="Forint" col6="bi bi-cursor"/>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg="12">
                <Card className="card">
                  <Card.Body className="card-body pb-0">
                    <Card.Title><h5 className="card-title">Android alkalmazás</h5></Card.Title>
                    <Card.Text className="news">
                      <div className="post-item clearfix">
                        <img src={xbankMobileImage} alt="" />
                        <h4><a href="#">Töltse le mobilbank alkalmazásunkat</a></h4>
                        <p>Ingyenes mobilbank alkalmazásunkkal bárhol és bármikor intézheti banki ügyeit. Egyszerű telepítés, ujjlenyomatos azonosítás, interaktív bankfiók - és ATM adatok, Élő valuta- és deviza árfolyamok.</p>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col lg="5">
            <Row>
              <Col lg="12">
                <Card className="card revenue-card top-selling">
                  <Card.Body className="card-body pb-0">
                    <Card.Title>
                      <div className="d-flex flex-row">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cash"></i>
                        </div>
                        <h5 className="card-title">Valuta árfolyamok</h5>
                      </div>
                    </Card.Title>
                    <Table className="table table-borderless datatable">
                    <TableHead col1="Valuta" col2="Vétel" col3="Eladás" col4="Dátum"/>
                      <tbody>
                        <TableRow col1="EUR" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="USD" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="GBP" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="AUD" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="BGN" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="CAD" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="CHF" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="CZK" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="DKK" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="HRK" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="JPY" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="NOK" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="PLN" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="RON" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="RSD" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="RUB" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="SEK" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg="12">
                <Card className="card revenue-card top-selling">
                  <Card.Body className="card-body pb-0">
                    <Card.Title>
                      <div className="d-flex flex-row">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-currency-euro"></i>
                        </div>
                        <h5 className="card-title">Deviza árfolyamok</h5>
                      </div>
                    </Card.Title>
                    <Table className="table table-borderless datatable">
                    <TableHead col1="Valuta" col2="Vétel" col3="Eladás" col4="Dátum"/>
                      <tbody>
                        <TableRow col1="EUR" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="USD" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="GBP" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="AUD" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="BGN" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="CAD" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="CHF" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="CZK" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="DKK" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="HRK" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="JPY" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="NOK" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="PLN" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="RON" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="RSD" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="RUB" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                        <TableRow col1="SEK" col2="309,24" col3="327,06" col4="2021-12-16 08:00"/>
                      </tbody>
                    </Table>  
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Fragment>;
  }
}



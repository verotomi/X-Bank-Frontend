import React, { Fragment } from "react";
import TableHead from './TableHead';
import Filter from '../../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import { ApiContext } from '../../../api/api';
import { connect } from "react-redux";
import TableRowStatements from "./TableRowStatements";


class StatementsBody extends React.Component {
  static contextType = ApiContext;
  constructor(props){
    super(props);
    this.state = {
      token: '',
      statements: []
    }
  }
  componentDidMount() {
    this.context.getStatements(this.props.id, this.props.token).then(statements => {
        this.setState({...this.state,
          statements: statements
    }) 
    });
  }
   
  render() {
    const { statements } = this.state

    return <Fragment>
        <Col lg="12">
            
            <Card className="card info-card revenue-card top-selling">
              <Filter filter1="Összes" filter2="Nyitva" filter3="Zárva"></Filter>
              <Card.Body className="card-body pb-0">
                <Card.Title>
                  <div className="d-flex flex-row">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-bank2"></i>
                    </div>
                    <h5 className="card-title">Számlakivonatok<span> | Összes</span></h5>
                    <div className="row mb-3">
                  <div className="col-sm-12">
                    <select className="form-select" aria-label="Default select example">
                      <option selected>Számlaszám</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
                  </div>
                </Card.Title>
                <Table className="table table-borderless datatable">
                  <TableHead col1="Dátum" col2="Számlaszám" col3="Állapot"/>
                  <tbody>
                  {statements.map(a =>            

                    <TableRowStatements key={a.id} col1={a.number} col2={a.id_bank_account} col3="letöltés"/>
                    )}
                 </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
    </Fragment>;
  }
}

function mapStateToProps(state) { // ennek más nevet is adhatunk! A lenti connect hatására minden alkalommal meghívódik, ha a store változik
  console.log("Beneficiaries")
  console.log(state)
  return state 
}

export default connect(mapStateToProps)(StatementsBody) 
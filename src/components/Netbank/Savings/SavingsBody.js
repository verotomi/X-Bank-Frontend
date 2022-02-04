import React, { Fragment } from "react";
import TableHead from './TableHead';
import Filter from '../../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import { ApiContext } from '../../../api/api';
import { connect } from "react-redux";
import TableRowSavings from "./TableRowSavings";


class SavingsBody extends React.Component {
  static contextType = ApiContext;
  constructor(props){
    super(props);
    this.state = {
      token: '',
      savings: []
    }
  }
  componentDidMount() {
    this.context.getSavings(this.props.id, this.props.token).then(savings => {
        this.setState({...this.state,
          savings: savings
    }) 
    });
  }
   
  render() {
    const { savings } = this.state

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
                    <h5 className="card-title">Megtakarítások<span> | Összes</span></h5>
                  </div>
                </Card.Title>
                <Table className="table table-borderless datatable">
                  <TableHead col1="Típus" col2="Lejárat" col3="Kamat" col4="Összeg" col5="Pénznem"/>
                  <tbody>
                  {savings.map(a =>            

                    <TableRowSavings key={a.id} col1={a.type} col2={a.expire_date} col3={a.rate} col4={a.amount} col5={a.currency}/>
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
  console.log("Savings")
  console.log(state)
  return state 
}

export default connect(mapStateToProps)(SavingsBody) 
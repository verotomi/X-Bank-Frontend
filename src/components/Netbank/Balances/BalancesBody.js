import React, { Fragment } from "react";
import TableHead from './TableHead';
import TableRowBalances from './TableRowBalances';
import Filter from '../../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import { ApiContext } from '../../../api/api';
import { connect } from "react-redux";


class AccountBalancesBody extends React.Component {
  static contextType = ApiContext;
  constructor(props){
    super(props);
    this.state = {
      token: '',
      accountBalances: []
    }
  }
  componentDidMount() {
    this.context.getAccountBalances(this.props.id, this.props.token).then(accountBalances => {
        this.setState({...this.state,
          accountBalances: accountBalances
    }) 
    });
  }
   
  render() {
    const { accountBalances } = this.state

    return <Fragment>
        <Col lg="12">
            
            <Card className="card info-card revenue-card top-selling">
              <Filter filter1="Összes" filter2="Nyitva" filter3="Zárva"></Filter>
              <Card.Body className="card-body pb-0">
                  <div className="d-flex flex-row">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-bank2"></i>
                    </div>
                    <h5 className="card-title">Bankszámlák<span> | Összes</span></h5>
                  </div>
                <Table className="table table-borderless datatable">
                  <TableHead col1="Számlaszám" col2="Típus" col3="Egyenleg" col4="Pénznem" col5="Állapot"/>
                  <tbody>
                  {accountBalances.map(a =>            

                    <TableRowBalances key={a.id} col1={a.number} col2={a.type} col3={a.balance} col4={a.currency} col5={a.status}/>
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
  console.log("Balances")
  console.log(state)
  return state 
}

export default connect(mapStateToProps)(AccountBalancesBody) 
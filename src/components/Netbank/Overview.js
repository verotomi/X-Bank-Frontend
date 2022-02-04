import React, { Fragment } from "react";
import xbankMobileImage from '../../assets/img/xbank_androidapp.png';
import TableHead from '../Shared/TableHead';
import TableRow from '../Shared/TableRow';
import Filter from '../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../Shared/BreadCrumbs";
import { ApiContext } from '../../api/api';
import { connect } from "react-redux";
import { updateAccountsAction } from '../../actions/actions'
import { updateSavingsAction } from '../../actions/actions'
import TableRowBalances from "./Balances/TableRowBalances";
import TableRowSavings from "./Savings/TableRowSavings";


class Overview extends React.Component {
  static contextType = ApiContext;
  constructor(props){
    super(props);
    this.state = {
      accounts: [], 
      savings: []
    }
  }

  componentDidMount() {
    this.context.getAccountBalances(this.props.id, this.props.token).then(accounts => {
      this.setState({...this.state,
        accounts: accounts          
      }) 
      this.props.updateAccountsAction(this.state.accounts)
      console.log("Netbank - Overview 30")
      console.log(this.state.accounts)
    });

    this.context.getSavings(this.props.id, this.props.token).then(savings => {
      this.setState({...this.state,
        savings: savings          
    }) 
    this.props.updateSavingsAction(this.state.savings)
    console.log("Netbank - Overview 30")
    console.log(this.state.savings)
  });

  }  
  render() {
    const { accounts, savings } = this.state
    //const { savings } = this.state

    return <Fragment>
        <BreadCrumbs data={[{name:"Netbank", link:"/"}, {name:"Áttekintés", link:""}]}/>

      <div className="dashboard">
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
                    {accounts.map(a =>            

                      <TableRowBalances key={a.id} col1={a.number} col2={a.type} col3={a.balance} col4={a.currency} col5={a.status}/>
                      )}
                    </tbody>
                  </Table>
                  
              </Card.Body>
            </Card>
            <Card className="card info-card revenue-card top-selling">
              <Filter filter1="Összes" filter2="Nyitva" filter3="Zárva"></Filter>
                <Card.Body className="card-body pb-0">
                    
                  <div className="d-flex flex-row">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-bank2"></i>
                    </div>
                    <h5 className="card-title">Megtakarítások<span> | Összes</span></h5>
                  </div>
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
      </div>
    </Fragment>;
  }
}

const mapDispatchToProps = {
  //updateAccounts(accounts)
  updateAccountsAction, 
  updateSavingsAction
}
function mapStateToProps(state) { // ennek más nevet is adhatunk! A lenti connect hatására minden alkalommal meghívódik, ha a store változik
  console.log("Netbank - Overview")
  console.log(state)
  return state 
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)


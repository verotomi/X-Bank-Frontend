import React, { Fragment } from "react";
import TableHead from './TableHead';
import Filter from '../../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import { ApiContext } from '../../../api/api';
import { connect } from "react-redux";
import TableRowBeneficiaries from "./TableRowBeneficiaries";


class BeneficiariesBody extends React.Component {
  static contextType = ApiContext;
  constructor(props){
    super(props);
    this.state = {
      token: '',
      beneficiaries: []
    }
  }
  componentDidMount() {
    this.context.getBeneficiaries(this.props.id, this.props.token).then(beneficiaries => {
        this.setState({...this.state,
          beneficiaries: beneficiaries
    }) 
    });
  }
   
  render() {
    const { beneficiaries } = this.state

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
                    <h5 className="card-title">Kedvezményezettek<span> | Összes</span></h5>
                  </div>
                </Card.Title>
                <Table className="table table-borderless datatable">
                  <TableHead col1="Sablon neve" col2="Partner neve" col3="Partner számlaszáma"/>
                  <tbody>
                  {beneficiaries.map(a =>            

                    <TableRowBeneficiaries key={a.id} col1={a.name} col2={a.partner_name} col3={a.partner_account_number}/>
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

export default connect(mapStateToProps)(BeneficiariesBody) 
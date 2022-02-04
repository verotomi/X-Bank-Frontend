import React, { Fragment } from "react";
import xbankMobileImage from '../../assets/img/xbank_androidapp.png';
import TableHead from '../Shared/TableHead';
import TableRow from '../Shared/TableRow';
import Filter from '../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../Shared/BreadCrumbs";
import { connect } from "react-redux";
import { transferOneTime } from '../../actions/actions'
import { ApiContext } from '../../api/api';
import { Link } from "react-router-dom";


class TransferOneTime extends React.Component {
  static contextType = ApiContext;

  constructor(props){
    super(props);
    this.state = {
      amount: 0, // input mező
      partnerName: "", // input mező, de select is kitöltheti
      partnerAccountNumber: "", // input mező, de select is kitöltheti
      comment: "", // input mező
      sourceAccountNumberId: 1, // alapból az első folyószámla van kiválasztva
      beneficiaries: [],
      currency: "",
      }
    };

    componentDidMount() {
      this.context.getBeneficiaries(this.props.id, this.props.token).then(beneficiaries => {
          this.setState({...this.state,
            beneficiaries: beneficiaries
      }) 
      });
    }

  handleSelectSourceAccountNumber = (e) =>{
    //debugger
    //this.setState({partnerAccountNumber: e.target.value})

    this.setState({sourceAccountNumberId: this.props.accounts[e.currentTarget.selectedIndex].id}) // -1 azért, mert az első elem az a "válasszon számlát" szöveg
    this.setState({currency: this.props.accounts[e.currentTarget.selectedIndex].currency}) // -1 azért, mert az első elem az a "válasszon számlát" szöveg
    console.log(this.state.sourceAccountNumberId) // érdekesség: a console-ra nem azt írja ki, ami ki lett választva, hanem az előzőt!
  }

  handleSelectPartner = (e) =>{
    //debugger
    this.setState({partnerName: this.state.beneficiaries[e.currentTarget.selectedIndex-2].partner_name}) // -2 azért, mert az első elem üres, a második meg az "új partner" szöveg
    this.setState({partnerAccountNumber: this.state.beneficiaries[e.currentTarget.selectedIndex-2].partner_account_number}) // -2 azért, mert az első elem üres, a második meg az "új partner" szöveg
    console.log(this.state.partnerAccountNumber)
  }


  handleSubmit = (e) => {
    const data = {
      type: "outgoing transfer",
      direction: "out",
      reference_number: Math.floor(Math.random() * 100000000) + 10000000,
      arrived_on: new Date().toLocaleString(),
      id_user: this.props.id, // store-ból az aktuális user id-je
      currency: this.state.currency,
      id_bank_account_number: this.state.sourceAccountNumberId,
      amount: this.state.amount, 
      partner_name: this.state.partnerName, 
      partner_account_number: this.state.partnerAccountNumber, 
      comment: this.state.comment, 
      }
    e.preventDefault()
    //debugger
    //console.clear()
    console.log("TransferOneTime: state, props")
    console.log(this.state)
    console.log(this.props)
    //debugger
    const response = this.context.createOneTimeTransfer(data, this.props.token).then(console.log("Transfer in progress"))
    //console.log(response)

    //
    // IDE BERAKNI EGY ÁTIRÁNYÍTÁST AZ ÁTTEKINTÉS OLDALRA
    //
    }


  render() {
    return <Fragment>
        <BreadCrumbs data={[{name:"Netbank", link:"/"}, {name:"Egyszeri átutalás", link:""}]}/>


      <div className="dashboard">
        <Row>
          <Col lg="12">
          <Card className="card info-card revenue-card top-selling">
            <Card.Body className="card-body pb-0">
              <Card.Title>
                <div className="d-flex flex-row">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-currency-euro"></i>
                  </div>
                  <h5 className="card-title">Egyszeri átutalás</h5>
                </div>
              </Card.Title>
                <form className="row g-2 netbank-form">
                  <div className="col-md-12 form-item">
                    <label for="selectSourceAccountNumber" className="form-label">Forrásszámla</label>
                    <select id="selectSourceAccountNumber" onChange={this.handleSelectSourceAccountNumber} className="form-select">
                      {/*<option disabled>Válasszon számlát...</option>*/}
                      {this.props.accounts.map(a =>
                      
                      <option key={a.id}> {a.type} - {a.number} - {a.balance} {a.currency}</option>
                      )}
                    </select>
                  </div>
                  <div className="col-md-9 form-item">
                    <label for="selectPartnerName" className="form-label">Kedvezményezett neve</label>
                    <select id="selectPartnerName" onChange={this.handleSelectPartner}  className="form-select">
                      <option defaultValue> </option>
                      <option default>Új kedvezményezett megadása</option>
                      {this.state.beneficiaries.map(a =>
                        <option key={a.id}> {a.name} - {a.partner_name} - {a.partner_account_number}</option>
                      )}
                      </select>
                  </div>

                  <div className="col-md-3 form-check form-item">
                      <label className="form-check-label" for="gridCheck1">Kedvezményezett mentése</label>
                      <input className="form-check-input" type="checkbox" id="gridCheck1"/>
                        
                    </div>
                  <div className="col-12 form-item">
                    <label for="inputPartnerAccountNumber" className="form-label">Célszámla</label>
                    <input type="text" onChange={e => this.setState({partnerAccountNumber: e.target.value})} className="form-control" id="inputPartnerAccountNumber" placeholder="00000000-00000000-00000000" value={this.state.partnerAccountNumber}/>
                  </div>
                  <div className="col-md-6">
                    <label for="inputAmount" className="form-label">Átutalandó összeg</label>
                    <input type="number" onChange={e => this.setState({amount: e.target.value})} className="form-control" id="inputAmount"/>
                  </div>
                  
                  <div className="col-md-2 form-item">
                    <label for="inputCurrency" className="form-label">Pénznem</label>
                    <input type="text" className="form-control" id="inputCurrency" readOnly value={this.props.accounts[this.state.sourceAccountNumberId-1].currency}/>
                  </div>
                  
                  <div className="col-12 form-item">
                    <label for="inputComment" className="form-label">Közlemény</label>
                    <input type="text" onChange={e => this.setState({comment: e.target.value})} className="form-control" id="inputComment" placeholder="2022/021 számla"/>
                  </div>
                  <div className="text-center form-item">
                    <button onClick={this.handleSubmit} type="submit" className="btn btn-success form-button">Mehet</button>
                    <Link to="/attekintes" className="btn btn-secondary">Mégsem</Link>
                    {/*<button type="reset" className="btn btn-secondary">Mégsem</button>*/}
                  </div>
                </form>
                </Card.Body>
              </Card>
              </Col> 
            </Row>
      </div>
    </Fragment>;
  }
}
const mapDispatchToProps = {
  transferOneTime
}
function mapStateToProps(state) {
  console.log("Transfer One Time")
  console.log(state)
  return state

}
export default connect(mapStateToProps, mapDispatchToProps)(TransferOneTime)
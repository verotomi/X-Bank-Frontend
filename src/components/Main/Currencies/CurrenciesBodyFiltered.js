import React, { Fragment } from "react";
import TableHead from './TableHead';
import TableRow from './TableRow';
import Filter from '../../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import { ApiContext } from '../../../api/api';


export default class CurrenciesBodyFiltered extends React.Component {
  static contextType = ApiContext;
  constructor(props){
    super(props);
    this.state = {
        currencies: []
    }
  }
  componentDidMount() {
    this.context.getCurrencies().then(currencies => {
        this.setState({
          currencies: currencies
    }) 
    });
  }
  
  render() {
    const { currencies } = this.state 
    const filteredCurrencies = currencies.slice(0,5)

    return <Fragment>
      
          <Col lg="12">
          <Card className="card revenue-card top-selling card-small">
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

                      {filteredCurrencies.map(c =>            
                        <TableRow key={c.id} col1={c.name} col2={c.buy} col3={c.sell} col4={c.validfrom}/>
                        )}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
  
    </Fragment>;
  }
}



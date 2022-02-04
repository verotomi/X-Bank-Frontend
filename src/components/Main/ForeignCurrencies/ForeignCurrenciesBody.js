import React, { Fragment } from "react";
import TableHead from './TableHead';
import TableRow from './TableRow';
import Filter from '../../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import { ApiContext } from '../../../api/api';


export default class ForeignCurrenciesBody extends React.Component {
  static contextType = ApiContext;
  constructor(props){
    super(props);
    this.state = {
        currencies: []
    }
  }

  componentDidMount() {
    this.context.getForeignCurrencies().then(currencies => {
        this.setState({
          currencies: currencies
    }) 
    });
  }
  render() {
    const { currencies } = this.state 

    return <Fragment>
       
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
                      {currencies.map(c =>            
                        <TableRow key={c.id}col1={c.name} col2={c.buy} col3={c.sell} col4={c.validfrom}/>
                        )}
                      </tbody>
                    </Table>  
                  </Card.Body>
                </Card>
              </Col>
        </Fragment>;
  }
}



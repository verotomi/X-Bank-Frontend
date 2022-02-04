import React, { Fragment } from "react";
import TableHead from '../../Shared/TableHead';
import TableRowAtms from './TableRowAtms';
import Filter from '../../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import { ApiContext } from '../../../api/api';


export default class AtmsBody extends React.Component {
  static contextType = ApiContext;
  constructor(props){
    super(props);
    this.state = {
        atms: []
  }
}
componentDidMount() {
  this.context.getAtms().then(atms => {
      this.setState({
        atms: atms
  }) 
  });
}
 
  render() {
    const { atms } = this.state 

    return <Fragment>

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
                      <TableHead col1="Irányítószám" col2="Település" col3="Cím" col4="Bankjegy" col5="Térkép"/>
                      <tbody>
                      {atms.map(a =>            

                        <TableRowAtms key={a.id} col1={a.zip} col2={a.city} col3={a.address} col4={a.type} col5="bi bi-cursor" col6={a.longitude} col7={a.latitude}/>
                        )}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>

    </Fragment>;
  }
}



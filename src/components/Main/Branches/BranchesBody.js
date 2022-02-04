import React, { Fragment } from "react";
import TableHeadBranches from './TableHeadBranches';
import TableRowBranches from './TableRowBranches';
import Filter from '../../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import { ApiContext } from '../../../api/api';


export default class BranchesBody extends React.Component {
  static contextType = ApiContext;
  constructor(props){
    super(props);
    this.state = {
      branches: []
    }
  }
  componentDidMount() {
    this.context.getBranches().then(branches => {
        this.setState({
          branches: branches
    }) 
    });
  } 
   
  render() {
    const { branches } = this.state

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
                    <h5 className="card-title">Bankfiókok<span> | Összes</span></h5>
                  </div>
                </Card.Title>
                <Table className="table table-borderless datatable">
                  <TableHeadBranches col1="Irányítószám" col2="Város" col3="Cím" col4="Nyitva" col5="Térkép"/>
                  <tbody>
                  {branches.map(b =>            

                    <TableRowBranches key={b.id} col1={b.zip} col2={b.city} col3={b.address} col4={b.openingtimesunday} col5="bi bi-cursor"/>
                    )}
                 </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
    </Fragment>;
  }
}



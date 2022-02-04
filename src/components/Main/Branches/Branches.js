import React, { Fragment } from "react";
import TableHeadBranches from './TableHeadBranches';
import TableRowBranches from './TableRowBranches';
import Filter from '../../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import { ApiContext } from '../../../api/api';
import BranchesBody from "./BranchesBody";

export default class Branches extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return <Fragment>
      <BreadCrumbs data={[{name:"Főoldal", link:"/"}, {name:"Bankfiókok", link:""}]}/>
      <div className="dashboard">
        <Row>
          <BranchesBody />  
        </Row>
      </div>
    </Fragment>
  }
} 
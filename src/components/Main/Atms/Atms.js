import React, { Fragment } from "react";
import TableHead from '../../Shared/TableHead';
import TableRowAtms from './TableRowAtms';
import Filter from '../../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import { ApiContext } from '../../../api/api';
import AtmsBody from "./AtmsBody";


export default class Atms extends React.Component {
  static contextType = ApiContext;
  constructor(props){
    super(props);
  }
 
  render() {

    return <Fragment>
      <BreadCrumbs data={[{name:"Főoldal", link:"/"}, {name:"Bankautomaták", link:""}]}/>
      
      <div className="dashboard">
        <Row>
          <AtmsBody /> 
          </Row>


      </div>
    </Fragment>;
  }
}



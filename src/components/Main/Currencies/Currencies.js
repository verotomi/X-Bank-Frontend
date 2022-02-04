import React, { Fragment } from "react";
import TableHead from '../../Shared/TableHead';
import TableRow from '../../Shared/TableRow';
import Filter from '../../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import { ApiContext } from '../../../api/api';
import CurrenciesBody from "./CurrenciesBody";

export default class Currencies extends React.Component {
  static contextType = ApiContext;
  constructor(props){
    super(props);
    }
  render() {
    return <Fragment>
      <BreadCrumbs data={[{name:"Főoldal", link:"/"}, {name:"Valuta árfolyamok", link:""}]}/>
      <div className="dashboard">
        <Row>
          <CurrenciesBody />
        </Row>
      </div>
    </Fragment>
  }
}
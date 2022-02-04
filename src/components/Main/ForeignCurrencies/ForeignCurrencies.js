import React, { Fragment } from "react";
import TableHead from './TableHead';
import TableRow from './TableRow';
import Filter from '../../Shared/Filter';
import { Row, Col, Table, Card } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import { ApiContext } from '../../../api/api';
import ForeignCurrenciesBody from "./ForeignCurrenciesBody";

export default class ForeignCurrencies extends React.Component {
  static contextType = ApiContext;
  constructor(props){
    super(props);
    }
  render() {
    return <Fragment>
      <BreadCrumbs data={[{name:"Főoldal", link:"/"}, {name:"Deviza árfolyamok", link:""}]}/>
      <div className="dashboard">
        <Row>
          <ForeignCurrenciesBody />
        </Row>
      </div>
    </Fragment>;
  }
}
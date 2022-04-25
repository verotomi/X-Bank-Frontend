import React, { Fragment } from "react";
import { Row } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import { ApiContext } from "../../../api/ApiProvider";
import CurrenciesBody from "./CurrenciesBody";

/**
 * A valuta árfolyamok listájának az alapja
 */
export default class Currencies extends React.Component {
  static contextType = ApiContext;

  render() {
    return (
      <Fragment>
        <BreadCrumbs
          data={[
            { name: "Főoldal", link: "/" },
            { name: "Valuta árfolyamok", link: "" },
          ]}
        />
        <div className="dashboard">
          <Row>
            <CurrenciesBody />
          </Row>
        </div>
      </Fragment>
    );
  }
}

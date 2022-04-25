import { ApiContext } from "../../../api/ApiProvider";
import { Row } from "react-bootstrap";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import ForeignCurrenciesBody from "./ForeignCurrenciesBody";
import React, { Fragment } from "react";

/**
 * A deviza árfolyamok listájának az alapja
 */
export default class ForeignCurrencies extends React.Component {
  static contextType = ApiContext;

  render() {
    return (
      <Fragment>
        <BreadCrumbs
          data={[
            { name: "Főoldal", link: "/" },
            { name: "Deviza árfolyamok", link: "" },
          ]}
        />
        <div className="dashboard">
          <Row>
            <ForeignCurrenciesBody />
          </Row>
        </div>
      </Fragment>
    );
  }
}

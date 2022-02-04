import React, { Fragment } from "react";

function TableRowBeneficiaries (props) {

    return (
      <Fragment>
        <tr>
          <td>{props.col1}</td>
          <td>{props.col2}</td>
          <td><a href="/">{props.col3}</a></td>
          <td>{props.col4}</td>
          <td>{props.col5}</td>
        </tr>
      </Fragment>
    );
  }
export default TableRowBeneficiaries
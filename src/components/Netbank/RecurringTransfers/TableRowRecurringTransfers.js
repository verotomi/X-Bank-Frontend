import React, { Fragment } from "react";

function TableRowRecurringTransfers (props) {

    return (
      <Fragment>
        <tr>
          <td>{props.col1}</td>
          <td>{props.col2}</td>
          <td>{props.col3}</td>
          <td>{props.col4}</td>
          <td>{props.col5}</td>
        </tr>
      </Fragment>
    );
  }
export default TableRowRecurringTransfers
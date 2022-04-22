import React, { Fragment } from "react";

function TableRowStatements(props) {
  return (
    <Fragment>
      <tr>
        <td className="thicker-font">{props.col1}</td>
        <td>{props.col2}</td>
        <td>{props.col3}</td>
        <td className="center-aligned-column">{props.col4}</td>
      </tr>
    </Fragment>
  );
}
export default TableRowStatements;

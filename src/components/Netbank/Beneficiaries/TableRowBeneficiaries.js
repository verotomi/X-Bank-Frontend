import React, { Fragment } from "react";

/**
 * A kedvezményezettek lista-adatainak a megjelenítése és formázása
 */
function TableRowBeneficiaries(props) {
  return (
    <Fragment>
      <tr>
        <td className="thicker-font">{props.col1}</td>
        <td>{props.col2}</td>
        <td>{props.col3}</td>
        <td>{props.col4}</td>
        <td>{props.col5}</td>
        <td>{props.col6}</td>
      </tr>
    </Fragment>
  );
}

export default TableRowBeneficiaries;

import React, { Fragment } from "react";

/**
 * A bankkártyalisták adatainak a megjelenítése, formázása
 */
function TableRowCreditCards(props) {
  return (
    <Fragment>
      <tr>
        <td>{props.col1}</td>
        <td>{props.col2}</td>
        <td>{props.col3}</td>
        <td
          className={
            props.col4 === "Aktív"
              ? "text-success thicker-font center-aligned-column"
              : "text-danger thicker-font center-aligned-column"
          }
        >
          {props.col4}
        </td>
        <td>{props.col5}</td>
        <td className="right-aligned-column" style={{ width: "15%" }}>
          {props.col6}
        </td>

        {props.type !=="light" && <td
        className="center-aligned-column" style={{ width: "15%" }}>
          {props.col7}
        </td>}
        {props.type ==="light" && <td
          className={
            props.col7 === "Forint"
              ? "text-success thicker-font center-aligned-column"
              : "text-danger thicker-font center-aligned-column"
          }
        >
          {props.col7}
        </td>}
      </tr>
    </Fragment>
  );
}

export default TableRowCreditCards;

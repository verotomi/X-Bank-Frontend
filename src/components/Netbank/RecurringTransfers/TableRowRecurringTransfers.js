import React, { Fragment } from "react";

function TableRowRecurringTransfers(props) {
  return (
    <Fragment>
      <tr>
        <td className="thicker-font">{props.col1}</td>
        <td>{props.col2}</td>
        <td>{props.col3}</td>
        <td className="right-aligned-column thicker-font">{props.col4}</td>
        <td className="center-aligned-column">{props.col5}</td>
        <td>{props.frequency + " " + props.days}</td>
        <td
          className={
            props.col7 === "Aktív"
              ? "text-success thicker-font center-aligned-column"
              : "text-danger thicker-font center-aligned-column"
          }
        >
          {props.col7}
        </td>
        <td>{props.col8}</td>
        <td>{props.col9}</td>
      </tr>
    </Fragment>
  );
}

export default TableRowRecurringTransfers;
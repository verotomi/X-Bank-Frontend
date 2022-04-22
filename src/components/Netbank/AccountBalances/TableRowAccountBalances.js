import React, { Fragment } from "react";

export default class TableRowAccountBalances extends React.Component {
  render() {
    return (
      <Fragment>
        <tr>
          <td>{this.props.col1}</td>
          <td>{this.props.col2}</td>
          <td className="right-aligned-column">{this.props.col3}</td>
          <td className="center-aligned-column">{this.props.col4}</td>
          <td
            className={
              this.props.col4 === "Aktív"
                ? "text-danger thicker-font center-aligned-column"
                : "text-success thicker-font center-aligned-column"
            }
          >
            {this.props.col5}
          </td>
        </tr>
      </Fragment>
    );
  }
}

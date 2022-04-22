import React, { Fragment } from "react";

export default class TableRowAtms extends React.Component {
  render() {
    return (
      <Fragment>
        <tr>
          <td className="thicker-font">{this.props.col1}</td>
          <td>{this.props.col2}</td>
          <td>{this.props.col3}</td>
          <td
            className={
              this.props.col4 === "Forint"
                ? "text-success thicker-font center-aligned-column"
                : "text-danger thicker-font center-aligned-column"
            }
          >
            {this.props.col4}
          </td>
          <td className="center-aligned-column">
            <a href={this.props.link} target="blank">
              <i className={this.props.col5}></i>
            </a>
          </td>
        </tr>
      </Fragment>
    );
  }
}

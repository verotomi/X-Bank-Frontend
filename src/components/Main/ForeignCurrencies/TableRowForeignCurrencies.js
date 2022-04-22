import React, { Fragment } from "react";

export default class TableRowForeignCurrencies extends React.Component {
  render() {
    return (
      <Fragment>
        <tr>
          {this.props.type !== "light" && (
            <Fragment>
              <td className="text-danger thicker-font">{this.props.col1}</td>
              <td>{this.props.col2}</td>
              <td className="right-aligned-column">{this.props.col3} Forint</td>
              <td className="right-aligned-column">{this.props.col4} Forint</td>
              <td className="center-aligned-column">{this.props.col5}</td>
            </Fragment>
          )}
          {this.props.type === "light" && (
            <Fragment>
              <td className="text-danger thicker-font">{this.props.col1}</td>
              <td className="right-aligned-column">{this.props.col2}</td>
              <td className="right-aligned-column">{this.props.col3}</td>
              <td className="center-aligned-column">{this.props.col4}</td>
            </Fragment>
          )}
        </tr>
      </Fragment>
    );
  }
}

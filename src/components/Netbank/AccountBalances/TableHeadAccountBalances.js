import React, { Fragment } from "react";

/**
 * A bankszámla-egyenlegek lista-fejlécének a megjelenítése, formázása
 */
export default class TableHeadAccountBalances extends React.Component {
  render() {
    return (
      <Fragment>
        <thead>
          <tr>
            <th scope="col">{this.props.col1}</th>
            <th scope="col">{this.props.col2}</th>
            <th className="right-aligned-column" style={{ width: "15%" }} scope="col">
              {this.props.col3}
            </th>
            <th className="center-aligned-column" scope="col">
              {this.props.col4}
            </th>
            <th className="center-aligned-column" scope="col">
              {this.props.col5}
            </th>
          </tr>
        </thead>
      </Fragment>
    );
  }
}

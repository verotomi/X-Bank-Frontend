import React, { Fragment } from "react";

export default class TableHeadCreditCards extends React.Component {
  render() {
    return (
      <Fragment>
        <thead>
          <tr>
            <th scope="col">{this.props.col1}</th>
            <th scope="col">{this.props.col2}</th>
            <th scope="col">{this.props.col3}</th>
            <th scope="col" className="center-aligned-column">
              {this.props.col4}
            </th>
            <th scope="col">{this.props.col5}</th>
            <th className="right-aligned-column" style={{ width: "15%" }} scope="col">
              {this.props.col6}
            </th>
            <th className="center-aligned-column" scope="col">
              {this.props.col7}
            </th>
          </tr>
        </thead>
      </Fragment>
    );
  }
}

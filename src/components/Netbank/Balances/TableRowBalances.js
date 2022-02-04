import React, { Fragment } from "react";

export default class TableRowBalances extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Fragment>
        <tr>
          <td>{this.props.col1}</td>
          <td>{this.props.col2}</td>
          <td>{this.props.col3}</td>
          <td>{this.props.col4}</td>
          <td>{this.props.col5}</td>
        </tr>
      </Fragment>
    );
  }
}
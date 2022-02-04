import React, { Fragment } from "react";

export default class TableRowAtms extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Fragment>
        <tr>
          <td className="fw-bold">{this.props.col1}</td>
          <td>{this.props.col2}</td>
          <td>{this.props.col3}</td>
          <td className="text-success fw-bold">{this.props.col4}</td>
          <td><a href="#"><i className={this.props.col5}></i></a></td>
        </tr>
      </Fragment>
    );
  }
}
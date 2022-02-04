import React, { Fragment } from "react";

export default class TableRow extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Fragment>
        <tr>
          <td><a href="#" className="text-danger fw-bold">{this.props.col1}</a></td>
          <td>{this.props.col2}</td>
          <td>{this.props.col3}</td>
          <td>{this.props.col4}</td>
          <td className="text-success fw-bold">{this.props.col5}</td>
          <td><a href="#"><i className={this.props.col6}></i></a></td>
        </tr>
      </Fragment>
    );
  }
}
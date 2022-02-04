import React, { Fragment } from "react";

export default class TableHeadBranches extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Fragment>
        <thead>
          <tr>
            <th scope="col">{this.props.col1}</th>
            <th scope="col">{this.props.col2}</th>
            <th scope="col">{this.props.col3}</th>
            <th scope="col">{this.props.col4}</th>
            <th scope="col">{this.props.col5}</th>
          </tr>
        </thead>
      </Fragment>
    );
  }
}
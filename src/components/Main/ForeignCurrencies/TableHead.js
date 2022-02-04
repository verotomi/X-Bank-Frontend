import React, { Fragment } from "react";

export default class TableHead extends React.Component {
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
            <th scope="col">{this.props.col6}</th>
            <th scope="col">{this.props.col7}</th>
            <th scope="col">{this.props.col8}</th>
            <th scope="col">{this.props.col9}</th>
          </tr>
        </thead>
      </Fragment>
    );
  }
}
import React, { Fragment } from "react";

/**
 * A kedvezményezettek lista-fejlécének a megjelenítése, formázása
 */
export default class TableHeadBeneficiaries extends React.Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
  }

  handleSort(value) {
    this.props.onSortChange(value);
  }

  render() {
    return (
      <Fragment>
        <thead>
          <tr>
            <th className="pointer-cursor" onClick={() => this.handleSort(this.props.col1)} scope="col">
              {this.props.col1} <i className={this.props.sortIconTableHead1}></i>
            </th>
            <th className="pointer-cursor" onClick={() => this.handleSort(this.props.col2)} scope="col">
              {this.props.col2} <i className={this.props.sortIconTableHead2}></i>
            </th>
            <th className="pointer-cursor" onClick={() => this.handleSort(this.props.col3)} scope="col">
              {this.props.col3} <i className={this.props.sortIconTableHead3}></i>
            </th>
            <th className="pointer-cursor" onClick={() => this.handleSort(this.props.col4)} scope="col">
              {this.props.col4} <i className={this.props.sortIconTableHead4}></i>
            </th>
            <th className="pointer-cursor" onClick={() => this.handleSort(this.props.col5)} scope="col">
              {this.props.col5} <i className={this.props.sortIconTableHead5}></i>
            </th>
            <th className="pointer-cursor" onClick={() => this.handleSort(this.props.col6)} scope="col">
              {this.props.col6} <i className={this.props.sortIconTableHead6}></i>
            </th>
          </tr>
        </thead>
      </Fragment>
    );
  }
}

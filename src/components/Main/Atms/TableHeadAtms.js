import React, { Fragment } from "react";

/**
 * A bankautomaták lista-fejlécének a megjelenítése, formázása
 */
export default class TableheadAtms extends React.Component {
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
            {this.props.type === "light" && (
              <Fragment>
                <th
                  className="pointer-cursor"
                  onClick={() => this.handleSort(this.props.col1)}
                  style={{ width: "20%" }}
                  scope="col"
                >
                  {this.props.col1} <i className={this.props.sortIconTableHead1}></i>
                </th>
                <th
                  className="pointer-cursor"
                  onClick={() => this.handleSort(this.props.col2)}
                  style={{ width: "20%" }}
                  scope="col"
                >
                  {this.props.col2} <i className={this.props.sortIconTableHead2}></i>
                </th>
                <th
                  className="pointer-cursor"
                  onClick={() => this.handleSort(this.props.col3)}
                  style={{ width: "30%" }}
                  scope="col"
                >
                  {this.props.col3} <i className={this.props.sortIconTableHead3}></i>
                </th>
                <th
                  className="pointer-cursor center-aligned-column"
                  onClick={() => this.handleSort(this.props.col4)}
                  style={{ width: "25%" }}
                  scope="col"
                >
                  {this.props.col4} <i className={this.props.sortIconTableHead4}></i>
                </th>
                <th className="center-aligned-column" style={{ width: "25%" }} scope="col">
                  {this.props.col5}
                </th>
              </Fragment>
            )}
            {this.props.type !== "light" && (
              <Fragment>
                <th className="pointer-cursor" onClick={() => this.handleSort(this.props.col1)} scope="col">
                  {this.props.col1} <i className={this.props.sortIconTableHead1}></i>
                </th>
                <th className="pointer-cursor" onClick={() => this.handleSort(this.props.col2)} scope="col">
                  {this.props.col2} <i className={this.props.sortIconTableHead2}></i>
                </th>
                <th className="pointer-cursor" onClick={() => this.handleSort(this.props.col3)} scope="col">
                  {this.props.col3} <i className={this.props.sortIconTableHead3}></i>
                </th>
                <th className="pointer-cursor center-aligned-column" onClick={() => this.handleSort(this.props.col4)} scope="col">
                  {this.props.col4} <i className={this.props.sortIconTableHead4}></i>
                </th>
                <th className="center-aligned-column" scope="col">
                  {this.props.col5}
                </th>
              </Fragment>
            )}
          </tr>
        </thead>
      </Fragment>
    );
  }
}

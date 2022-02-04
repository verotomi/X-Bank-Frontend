import React, { Fragment } from "react";

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Fragment>
      <div className="filter">
        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
          <li className="dropdown-header text-start">
            <h6>Szűrő</h6>
          </li>
          <li><a className="dropdown-item" href="#">{this.props.filter1}</a></li>
          <li><a className="dropdown-item" href="#">{this.props.filter2}</a></li>
          <li><a className="dropdown-item" href="#">{this.props.filter3}</a></li>
        </ul>
      </div>
    </Fragment>;
  }
}



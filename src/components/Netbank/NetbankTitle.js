import React, { Fragment } from "react";

export default class NetbankTitle extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment >
        <div className="pagetitle">
          <h1>{this.props.name}</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">{this.props.name}</a>
              </li>
            </ol>
          </nav>
        </div>
      </Fragment>
    );
  }
}



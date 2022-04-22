import React, { Fragment } from "react";
import { Dropdown } from "react-bootstrap";

export default class FilterStatements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOpen: false,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.setState({ filterOpen: false });
  }

  toggleDropdown() {
    this.setState({ filterOpen: !this.state.filterOpen ? true : false });
  }

  handleFilter(value) {
    this.props.onFilterChange(value);
  }

  render() {
    let i = 0;
    return (
      <Fragment>
        <div className="filter">
          <Dropdown>
            <Dropdown.Toggle variant="white" id="dropdown-basic">
              <i className="icon bi bi-three-dots"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header>Szűrő</Dropdown.Header>
              <Dropdown.Item onClick={() => this.handleFilter("all")}>Összes bankszámla</Dropdown.Item>
              {this.props.ertek.map((a) => (
                <Dropdown.Item onClick={() => this.handleFilter(a)}>{this.props.szurok[i++]}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Fragment>
    );
  }
}

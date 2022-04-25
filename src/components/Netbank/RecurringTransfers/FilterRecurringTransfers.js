import React, { Fragment } from "react";
import { Dropdown } from "react-bootstrap";

/**
 * Az állandó megbízások listájának a szűrését kezelő komponens
 */
export default class FilterRecurringTransfers extends React.Component {
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
    return (
      <Fragment>
        <div className="filter">
          <Dropdown>
            <Dropdown.Toggle variant="white" id="dropdown-basic">
              <i className="icon bi bi-three-dots"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header>Szűrő</Dropdown.Header>
              <Dropdown.Item onClick={() => this.handleFilter("Összes")}>{this.props.filter1}</Dropdown.Item>
              <Dropdown.Item onClick={() => this.handleFilter("Aktív")}>{this.props.filter2}</Dropdown.Item>
              <Dropdown.Item onClick={() => this.handleFilter("Inaktív")}>{this.props.filter3}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Fragment>
    );
  }
}

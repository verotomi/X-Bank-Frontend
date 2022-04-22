import React, { Fragment } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

export default class TableRowBranches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: "text-danger fw-bold",
      todayOpen: "8:00-16:00",
    };
    this.checkTime = this.checkTime.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const today = new Date().getDay();
    switch (today) {
      case 0:
        this.setState({ todayOpen: this.props.openingtimesunday });
        break;
      case 1:
        this.setState({ todayOpen: this.props.openingtimemonday });
        break;
      case 2:
        this.setState({ todayOpen: this.props.openingtimetuesday });
        break;
      case 3:
        this.setState({ todayOpen: this.props.openingtimewednesday });
        break;
      case 4:
        this.setState({ todayOpen: this.props.openingtimethursday });
        break;
      case 5:
        this.setState({ todayOpen: this.props.openingtimefriday });
        break;
      case 6:
        this.setState({ todayOpen: this.props.openingtimesaturday });
        break;
      default:
        break;
    }
  }

  checkTime(range) {
    const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "numeric", minute: "numeric" });
    if (currentTime >= range[0] && currentTime <= range[1]) {
      return "text-success thicker-font center-aligned-column help-cursor";
    } else {
      return "text-danger thicker-font center-aligned-column help-cursor";
    }
  }

  render() {
    const popover = (
      <Popover id="popover-basic">
        <Popover.Header className="">Nyitvatartás</Popover.Header>
        <Popover.Body>
          <table>
            <tr>
              <td className="thicker-font no-underline">Hétfő: </td>
              <td className="no-underline">
                {this.props.openingtimemonday === "00:00-00:00" ? "Zárva" : this.props.openingtimemonday}
              </td>
            </tr>
            <tr>
              <td className="thicker-font no-underline">Kedd: </td>
              <td className="no-underline">
                {this.props.openingtimetuesday === "00:00-00:00" ? "Zárva" : this.props.openingtimetuesday}
              </td>
            </tr>
            <tr>
              <td className="thicker-font no-underline">Szerda: </td>
              <td className="no-underline">
                {this.props.openingtimewednesday === "00:00-00:00" ? "Zárva" : this.props.openingtimewednesday}
              </td>
            </tr>
            <tr>
              <td className="thicker-font no-underline">Csütörtök: &nbsp;&nbsp;&nbsp;</td>
              <td className="no-underline">
                {this.props.openingtimethursday === "00:00-00:00" ? "Zárva" : this.props.openingtimethursday}
              </td>
            </tr>
            <tr>
              <td className="thicker-font no-underline">Péntek: </td>
              <td className="no-underline">
                {this.props.openingtimefriday === "00:00-00:00" ? "Zárva" : this.props.openingtimefriday}
              </td>
            </tr>
            <tr>
              <td className="thicker-font no-underline">Szombat: </td>
              <td className="no-underline">
                {this.props.openingtimesaturday === "00:00-00:00" ? "Zárva" : this.props.openingtimesaturday}
              </td>
            </tr>
            <tr>
              <td className="thicker-font no-underline">Vasárnap: </td>
              <td className="no-underline">
                {this.props.openingtimesunday === "00:00-00:00" ? "Zárva" : this.props.openingtimesunday}
              </td>
            </tr>
          </table>
        </Popover.Body>
      </Popover>
    );

    return (
      <Fragment>
        <tr>
          <td className="thicker-font">{this.props.col1}</td>
          <td>{this.props.col2}</td>
          <td>{this.props.col3}</td>
          <OverlayTrigger placement="top" overlay={popover} delay="700">
            <td className={this.checkTime(this.state.todayOpen.split("-"))}>{this.state.todayOpen}</td>
          </OverlayTrigger>
          <td className="center-aligned-column">
            <a href={this.props.link} target="blank">
              <i className={this.props.col5}></i>
            </a>
          </td>
        </tr>
      </Fragment>
    );
  }
}

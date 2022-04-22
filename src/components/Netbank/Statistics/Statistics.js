import { ApiContext } from "../../../api/ApiProvider";
import { connect } from "react-redux";
import { Row, Col, Card } from "react-bootstrap";
import * as constantsClass from "../../../assets/constant/constants";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import React, { Fragment } from "react";

class Statistics extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      contentTextClass: "loading",
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  startQuery = async () => {
    await this.context.getStatistics(this.props.token).then((data) => {
      if (data.length === 0) {
        this.setState({ contentTextClass: "loading" });
      } else {
        this.setState({ contentTextClass: "loading" });
      }
      this.setState({ content: data });
    });
  };

  componentDidMount() {
    this.startQuery();
    this.setState({ content: constantsClass.TEXT_LOADING });
  }

  handleSubmit() {
    window.open(this.props.serverAddress + "/statisticssimple", "_blank");
  }

  render() {
    return (
      <Fragment>
        <BreadCrumbs data={[{ name: "Statisztika", link: "" }]} />
        <div className="dashboard">
          <Row>
            <Col lg="12">
              <Card className="card netbank-card">
                <Card.Body className="card-body pb-0">
                  <div className="d-flex flex-row">
                    <div className="card-icon d-flex align-items-center justify-content-center">
                      <i className="bi bi-table"></i>
                    </div>
                    <h5 className="card-title">Pénzügyi kimutatás</h5>
                  </div>
                  {this.state.content.length < 20 ? (
                    <div>
                      <p className={this.state.contentTextClass}>
                        <br />
                        <br />
                        {this.state.content}
                      </p>
                    </div>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Statistics);

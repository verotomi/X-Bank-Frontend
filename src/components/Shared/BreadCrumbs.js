import { Breadcrumb } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import React, { Fragment } from "react";

function BreadCrumbs(props) {
  return (
    <Fragment>
      <div className="pagestitle">
        <nav>
          <Breadcrumb>
            {props.data.map((a) =>
              a.link !== "" ? (
                <Breadcrumb.Item>
                  <NavLink to={a.link}>{a.name}</NavLink>
                </Breadcrumb.Item>
              ) : (
                <Breadcrumb.Item active>{a.name}</Breadcrumb.Item>
              )
            )}
          </Breadcrumb>
        </nav>
      </div>
    </Fragment>
  );
}

export default BreadCrumbs;

import { Breadcrumb } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import React, { Fragment } from "react";

/**
 * Az aktuális menü-helyzet megjelenítése
 * @param {*} props 
 */
function BreadCrumbs(props) {
  return (
    <Fragment>
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
    </Fragment>
  );
}

export default BreadCrumbs;

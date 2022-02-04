import React, { Fragment } from "react";
import { Breadcrumb, NavLink as NavLinkBS } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Overview from '../Netbank/Overview'
import Balances from '../Netbank/Balances/Balances'


function BreadCrumbs (props) {

    return (
      <Fragment >
        <div className="pagetitle">
          {/*<h1>{props.name}</h1>*/}
          <nav>
            <Breadcrumb>
              {props.data.map(a => 
                a.link != "" ? 
                  (<Breadcrumb.Item>
                    <NavLink to={a.link}>
                      {a.name}
                    </NavLink>
                  </Breadcrumb.Item>)
                  :
                  (<Breadcrumb.Item active>
                      {a.name}
                  </Breadcrumb.Item>)
                   
              )}

            </Breadcrumb>
          </nav>
        </div>
      </Fragment>
    );
  }
  export default BreadCrumbs


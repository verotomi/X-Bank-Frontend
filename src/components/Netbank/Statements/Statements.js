import React, { Fragment } from "react";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import StatementsBody from "./StatementsBody";

function  Statements () {
    return <Fragment>
      <BreadCrumbs data={[{name:"Netbank", link:"/"}, {name:"Bankszámla kivonatok", link:""}]}/>
      <div className="dashboard">
          <StatementsBody />  
      </div>
    </Fragment>
  }
export default Statements
import React, { Fragment } from "react";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import SavingsBody from "./SavingsBody";

function  SavingsList () {
    return <Fragment>
      <BreadCrumbs data={[{name:"Netbank", link:"/"}, {name:"Megtakarítások", link:""}, {name:"Megtakarítások listája", link:""}]}/>
      <div className="dashboard">
          <SavingsBody />  
      </div>
    </Fragment>
  }
export default SavingsList
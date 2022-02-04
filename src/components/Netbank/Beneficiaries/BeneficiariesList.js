import React, { Fragment } from "react";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import BeneficiariesBody from "./BeneficiariesBody";

function  BeneficiariesList () {
    return <Fragment>
      <BreadCrumbs data={[{name:"Netbank", link:"/"}, {name:"Kedvezményezettek", link:""},{name:"Kedvezényezettek listája", link:""}]}/>

      <div className="dashboard">
          <BeneficiariesBody />  
      </div>
    </Fragment>
  }
export default BeneficiariesList
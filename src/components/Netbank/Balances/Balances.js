import React, { Fragment } from "react";
import BreadCrumbs from "../../Shared/BreadCrumbs";
import BalancesBody from "./BalancesBody";

function  AccountBalances () {
    return <Fragment>
      <BreadCrumbs data={[{name:"Netbank", link:"/"}, {name:"Számla egyenlegek", link:""}]}/>


      <div className="dashboard">
          <BalancesBody />  
      </div>
    </Fragment>
  }
export default AccountBalances
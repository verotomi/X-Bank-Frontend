import HeaderNav from "../Shared/HeaderNav";
import Profile from "./Profile/Profile";
import React, { Fragment } from "react";

export default function NetbankHeader() {
  return (
    <Fragment>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <HeaderNav />
        <Profile />
      </header>
    </Fragment>
  );
}

import LoginButton from "./LoginButton/LoginButton";
import HeaderNav from "../Shared/HeaderNav";
import React, { Fragment } from "react";
import useUserData from "../../assets/script/scripts";

export default function MainHeader() {
  const { setUserData } = useUserData();

  return (
    <Fragment>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <HeaderNav />
        <LoginButton setUserData={setUserData} />
      </header>
    </Fragment>
  );
}

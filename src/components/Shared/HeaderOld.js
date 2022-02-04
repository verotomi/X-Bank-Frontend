import React, { Fragment } from "react";
import Logo from './Logo';
import LoginButton from '../Main/LoginButton';
import useUserData from './useUserData';


export default class Header extends React.Component {
  render() {
    return <Fragment>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <Logo/>
        <LoginButton setUserData={setUserData} />
  
      </header>
    </Fragment>;
  }
}



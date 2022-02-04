import React, { Fragment } from "react";
import Logo from '../Shared/Logo';
//import LogoutButton from '../Main/LogoutButton';
import useUserData from '../Shared/useUserData';
import userIcon from '../../assets/img/user2.png';
import DropDown from "./Profile";



export default function NetbankHeader() {
  
  const { userData, setUserData } = useUserData();
  
  return <>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <Logo/>
        {/*<LogoutButton /> */}
        <DropDown/>
      </header>
    </>;

}



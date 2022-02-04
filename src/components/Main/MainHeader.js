import React, { Fragment } from "react";
import Logo from '../Shared/Logo';
import LoginButton from './LoginButton';
import useUserData from '../Shared/useUserData';


export default function MainHeader() {
  
  const { userData, setUserData } = useUserData();
  
  return <>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <Logo/>
        <LoginButton setUserData={setUserData} />

      </header>
    </>;

}



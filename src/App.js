import React from 'react';
import './App.scss';
import { Fragment } from 'react';
import Header from './components/Main/MainHeader';
import Footer from './components/Shared/Footer';
import Scripts from './components/Shared/Scripts';
import  './assets/vendor/bootstrap/css/bootstrap.min.css';
import  './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import  './assets/vendor/boxicons/css/boxicons.min.css';
import  './assets/vendor/remixicon/remixicon.css';
import  './assets/css/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Preferences from './components/Netbank/Netbank';
import useUserData from './components/Shared/useUserData';
//import Login from './components/Login/Login_NOT_USED_ANYMORE';
import LoginButton from './components/Main/LoginButton';
import { useStore } from 'react-redux'
import { connect } from 'react-redux'
import Main from './components/Main/Main';
import Netbank from './components/Netbank/Netbank';

//import './style.scss';

function App(props) {

  //const { token, setUserData } = useUserData();
  const store = useStore()
  const token = store.getState().token;
  
  //debugger
  if(props.token.length < 5) {
    return (
        <BrowserRouter>
         <Main/>
      </BrowserRouter>
    )
    //return <LoginButton setUserData={setUserData} />
  }
  //debugger
  return (
    <BrowserRouter>
      <Netbank />
    </BrowserRouter>

  )
};

function mapStateToProps(state) { // ennek más nevet is adhatunk! A lenti connect hatására minden alkalommal meghívódik, ha a store változik
  console.log(state)
  return state
}

/*function mapStateToProps(state) { // ennek más nevet is adhatunk! A lenti connect hatására minden alkalommal meghívódik, ha a store változik
  console.log(`Token: ${state.token}`)
  if(state.token.length < 10) {
    //debugger
    return <Main/>
    //return <LoginButton setUserData={setUserData} />
  }
  //debugger
  return (
    <Netbank />
  )
}*/

export default connect(mapStateToProps)(App)

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.scss";
import "./assets/vendor/bootstrap-icons/bootstrap-icons.css";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { tryToLogin, updateAccountsAction } from "./actions/actions";
import Main from "./components/Main/Main";
import Netbank from "./components/Netbank/Netbank";
import React from "react";

function App(props) {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  if (userData != null) {
    if (userData.token.length > 0 && props.accounts.length === 0) {
      props.tryToLogin(userData);
    }
  }
  try {
    if (props.token.length > 0) {
      return (
        <BrowserRouter>
          <Netbank />
        </BrowserRouter>
      );
    }
    return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
  } catch (error) {}
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = {
  tryToLogin,
  updateAccountsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

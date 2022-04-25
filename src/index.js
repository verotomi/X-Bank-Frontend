import "./index.scss";
import { ApiProvider } from "./api/ApiProvider";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { SERVER_ADDRESS } from "./assets/config/config";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

/**
 * Az alkalmazás alapja és a Redux Store helye
 */
const initialState = {
  accounts: [],
  created_on: "2000-01-01 00:00:00",
  firstname: "",
  id: 0,
  isEditCreditCardComponentOpen: false,
  isSidebarClose: false,
  isSidebarItem2Open: false,
  isSidebarItem3Open: false,
  isSidebarItemOpen: false,
  last_login: "2000-12-31 23:59:59",
  lastname: "",
  loggedOutModalText: "",
  netbank_id: "0000",
  showLoggedOutModal: false,
  token: "",
};
const store = createStore(reducer);
function reducer(state = initialState, action) {
  const isSidebarClose = state.isSidebarClose;
  const isSidebarItemOpen = state.isSidebarItemOpen;
  const isSidebarItem2Open = state.isSidebarItem2Open;
  const isSidebarItem3Open = state.isSidebarItem3Open;
  const showLoggedOutModal = state.showLoggedOutModal;
  const loggedOutModalText = state.loggedOutModalText;
  const isEditCreditCardComponentOpen = state.isEditCreditCardComponentOpen;
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        id: action.data.id,
        firstname: action.data.firstname,
        lastname: action.data.lastname,
        netbank_id: action.data.netbank_id,
        last_login: action.data.last_login,
        token: action.data.token,
      };
    case "LOGOUT":
      return { ...initialState, showLoggedOutModal: showLoggedOutModal, loggedOutModalText: loggedOutModalText };
    case "SIDEBAR_CHANGE":
      return { ...state, isSidebarClose: isSidebarClose ? false : true };
    case "SIDEBAR_ITEM_CHANGE":
      return { ...state, isSidebarItemOpen: isSidebarItemOpen ? false : true };
    case "SIDEBAR_ITEM_CHANGE_2":
      return { ...state, isSidebarItem2Open: isSidebarItem2Open ? false : true };
    case "SIDEBAR_ITEM_CHANGE_3":
      return { ...state, isSidebarItem3Open: isSidebarItem3Open ? false : true };
    case "UPDATE_ACCOUNTS":
      return { ...state, accounts: action.data };
    case "TOGGLE_EDIT_CREDIT_CARD_COMPONENT":
      return { ...state, isEditCreditCardComponentOpen: isEditCreditCardComponentOpen ? false : true };
    case "SHOW_LOGGEDOUT_MODAL":
      return { ...state, showLoggedOutModal: true, loggedOutModalText: action.data };
    case "HIDE_LOGGEDOUT_MODAL":
      return { ...state, showLoggedOutModal: false };
    default:
      return state;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider serverAddress={SERVER_ADDRESS}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

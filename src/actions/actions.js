export function tryToLogin(userData) {
  return {
    type: "LOGIN",
    data: userData,
  };
}

export function tryToLogout() {
  return {
    type: "LOGOUT",
  };
}

export function toggleSidebar() {
  return {
    type: "SIDEBAR_CHANGE",
  };
}

export function toggleSidebarItem() {
  return {
    type: "SIDEBAR_ITEM_CHANGE",
  };
}

export function toggleSidebarItem2() {
  return {
    type: "SIDEBAR_ITEM_CHANGE_2",
  };
}

export function toggleSidebarItem3() {
  return {
    type: "SIDEBAR_ITEM_CHANGE_3",
  };
}

export function updateAccountsAction(accounts) {
  return {
    type: "UPDATE_ACCOUNTS",
    data: accounts,
  };
}

export function updateSavingsAction(savings) {
  return {
    type: "UPDATE_SAVINGS",
    data: savings,
  };
}

export function transferOneTime(transferData) {
  return {
    type: "ONE_TIME_TRANSFER",
    data: transferData,
  };
}

export function toggleEditCreditCardComponent() {
  return {
    type: "TOGGLE_EDIT_CREDIT_CARD_COMPONENT",
  };
}

export function showLoggedOutModal(text) {
  return {
    type: "SHOW_LOGGEDOUT_MODAL",
    data: text,
  };
}

export function hideLoggedOutModal() {
  return {
    type: "HIDE_LOGGEDOUT_MODAL",
  };
}

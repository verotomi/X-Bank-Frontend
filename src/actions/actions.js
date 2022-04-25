/**
 * A felhasználó bejelentkezését segítő action
 * @param {array} userData a felhasználó adatai és a backend-től kapott token
 */
export function tryToLogin(userData) {
  return {
    type: "LOGIN",
    data: userData,
  };
}

/**
 * A felhasználó kijelentkezését végző action
 */
export function tryToLogout() {
  return {
    type: "LOGOUT",
  };
}

/**
 * Az oldalsó menü megjelenítése / elrejtése
 */
export function toggleSidebar() {
  return {
    type: "SIDEBAR_CHANGE",
  };
}

/**
 * Az oldalsó menü első almenüjét nyitja ki / csukja össze
 */
export function toggleSidebarItem() {
  return {
    type: "SIDEBAR_ITEM_CHANGE",
  };
}

/**
 * Az oldalsó menü második almenüjét nyitja ki / csukja össze
 */
export function toggleSidebarItem2() {
  return {
    type: "SIDEBAR_ITEM_CHANGE_2",
  };
}

/**
 * Az oldalsó menü harmadik almenüjét nyitja ki / csukja össze
 */
export function toggleSidebarItem3() {
  return {
    type: "SIDEBAR_ITEM_CHANGE_3",
  };
}

/**
 * Frissíti a felhasználó bankszámla-adatait
 * @param {array} accounts a felhasználó bankszámláinak az adatait tartalmazza 
 */
export function updateAccountsAction(accounts) {
  return {
    type: "UPDATE_ACCOUNTS",
    data: accounts,
  };
}

/**
 * Frissíti a felhasználó megtakarításainak az adatait
 * @param {array} savings a felhasználó megtakarításai
 */
export function updateSavingsAction(savings) {
  return {
    type: "UPDATE_SAVINGS",
    data: savings,
  };
}

/**
 * A bankkártyák kezelését végző komponens megjelenítése / elrejtése
 */
export function toggleEditCreditCardComponent() {
  return {
    type: "TOGGLE_EDIT_CREDIT_CARD_COMPONENT",
  };
}

/**
 * Az automatikus kijelentkeztetésről tájékoztató felugró ablak megjelenítése
 * @param {string} text a megjelenítendő szöveg 
 */
export function showLoggedOutModal(text) {
  return {
    type: "SHOW_LOGGEDOUT_MODAL",
    data: text,
  };
}

/**
 * A kijelentkezésnél megjelenő felugró ablak elrejtése / megjelenítése
 */
export function hideLoggedOutModal() {
  return {
    type: "HIDE_LOGGEDOUT_MODAL",
  };
}

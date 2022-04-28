import { createContext, Component } from "react";

export const ApiContext = createContext({
  apiToken: null,
  breakDeposit: () => {},
  changePassword: () => {},
  createBeneficiary: () => {},
  createOneTimeTransfer: () => {},
  createRecurringTransfer: () => {},
  deleteBeneficiary: () => {},
  deleteRecurringTransfer: () => {},
  getAccounts: () => {},
  getAccountHistory: () => {},
  getAtms: () => {},
  getBeneficiaries: () => {},
  getBranches: () => {},
  getCreditCards: () => {},
  getCurrencies: () => {},
  getForeignCurrencies: () => {},
  getRecurringTransfers: () => {},
  getSavings: () => {},
  getSavingTypes: () => {},
  getStatements: () => {},
  getStatistics: () => {},
  loginUser: () => {},
  logoutUser: () => {},
  updateBeneficiary: () => {},
  updateCreditCard: () => {},
  updateRecurringTransfer: () => {},
});

export class ApiProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiToken: "",
      breakDeposit: this.breakDeposit,
      changePassword: this.changePassword,
      createBeneficiary: this.createBeneficiary,
      createNewSaving: this.createNewSaving,
      createOneTimeTransfer: this.createOneTimeTransfer,
      createRecurringTransfer: this.createRecurringTransfer,
      deleteBeneficiary: this.deleteBeneficiary,
      deleteRecurringTransfer: this.deleteRecurringTransfer,
      getAccounts: this.getAccounts,
      getAccountHistory: this.getAccountHistory,
      getAtms: this.getAtms,
      getBeneficiaries: this.getBeneficiaries,
      getBranches: this.getBranches,
      getCreditCards: this.getCreditCards,
      getCurrencies: this.getCurrencies,
      getForeignCurrencies: this.getForeignCurrencies,
      getRecurringTransfers: this.getRecurringTransfers,
      getSavings: this.getSavings,
      getSavingTypes: this.getSavingTypes,
      getStatements: this.getStatements,
      getStatistics: this.getStatistics,
      loginUser: this.loginUser,
      logoutUser: this.logoutUser,
      updateBeneficiary: this.updateBeneficiary,
      updateCreditCard: this.updateCreditCard,
      updateRecurringTransfer: this.updateRecurringTransfer,
    };
  }

  /**
   * A felhasználó bejelentkezéséhez kapcsolódó API kérés
   * @param {array} credentials JSON tömb, a felhasználó neve és jelszava
   */
  loginUser = async (credentials) => {
    return await fetch(this.props.serverAddress + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  };

  /**
   * A felhasználó kijelentkezését végző API kérés
   * @param {array} credentials JSON tömb, a felhasználó neve és jelszava
   * @param {string} token a felhasználó tokenje
   */
  logoutUser = async (credentials, token) => {
    return await fetch(this.props.serverAddress + "/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  };

 /**
   * A jelszóváltoztatást végző API kérés
   * @param {array} credentials JSON tömb, a felhasználó neve és jelszava
   * @param {string} token a felhasználó tokenje
   */
  changePassword = async (credentials, token) => {
    return await fetch(this.props.serverAddress + "/changepassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  };

   /**
   * A pénzügyi statisztikai kimutatás megjelenítéséhez tartozó API kérés
   * @param {array} credentials JSON tömb, a felhasználó neve és jelszava
   * @param {string} token a felhasználó tokenje
   */
  getStatistics = async (token) => {
    return await fetch(this.props.serverAddress + "/statistics", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => data.text())
      .catch((error) => {
        console.error(`Could not get products: ${error}`);
      });
  };

  /**
   * A számlatörténet megjelenítéséhez tartozó API kérés
   * @param {array} data a kérés feldolgozásához szükséges adatok
   * @param {string} token a felhasználó tokenje
   */
  getAccountHistory = async (data, token) => {
    const response = await fetch(this.props.serverAddress + "/getaccounthistory", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (true) {
    }
    const history = response.json();
    return history;
  };

  /**
   * Új megtakarítás rögzítéséhez tartozó API kérés
   * @param {array} data a kérés feldolgozásához szükséges adatok
   * @param {string} token a felhasználó tokenje
   */
  createNewSaving = async (data, token) => {
    const response = await fetch(this.props.serverAddress + "/insertsaving", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
    return response;
  };

  /**
   * A lehetséges megtakarítási módozatok lekérdezését végző API kérés
   * @param {string} token a felhasználó tokenje
   */
  getSavingTypes = async (token) => {
    const response = await fetch(this.props.serverAddress + "/getsavingtypes", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const savingTypes = response.json();
    return savingTypes;
  };

  /**
   * Egy megtakarítás feltöréséhez tartozó API kérés
   * @param {array} data a kérés feldolgozásához szükséges adatok
   * @param {string} token a felhasználó tokenje
   */
  breakDeposit = async (data, token) => {
    const response = await fetch(this.props.serverAddress + "/breakdeposit", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
    return response;
  };

  /**
   * Állandó átutalási megbízás módoísítását végző API kérés
   * @param {array} data a kérés feldolgozásához szükséges adatok
   * @param {string} token a felhasználó tokenje
   */
  updateRecurringTransfer = async (data, token) => {
    const response = await fetch(this.props.serverAddress + "/updaterecurringtransfer", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
    return response;
  };

  /**
   * Állandó átutalási megbízás törlését végző API kérés
   * @param {array} data a kérés feldolgozásához szükséges adatok
   * @param {string} token a felhasználó tokenje
   */
  deleteRecurringTransfer = async (data, token) => {
    const response = await fetch(this.props.serverAddress + "/deleterecurringtransfer", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const recurringtransfer = response.json();
    return recurringtransfer;
  };

  /**
   * Új állandó átutalási megbízás rögzítését végző API kérés
   * @param {array} data a kérés feldolgozásához szükséges adatok
   * @param {string} token a felhasználó tokenje
   */
  createRecurringTransfer = async (data, token) => {
    const response = await fetch(this.props.serverAddress + "/createrecurringtransfer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
    return response;
  };

  /**
   * Átutalási megbízás indítását végző API kérés
   * @param {array} data a kérés feldolgozásához szükséges adatok
   * @param {string} token a felhasználó tokenje
   */
  createOneTimeTransfer = async (data, token) => {
    const response = await fetch(this.props.serverAddress + "/createtransferonetime", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
    return response;
  };

  /**
   * Új kedvezményezett rögzítését végző API kérés
   * @param {array} data a kérés feldolgozásához szükséges adatok
   * @param {string} token a felhasználó tokenje
   */
  createBeneficiary = async (data, token) => {
    const response = await fetch(this.props.serverAddress + "/createbeneficiary", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
    return response;
  };

  /**
   * Meglévő kedvezményezett módosítását végző API kérés
   * @param {array} data a kérés feldolgozásához szükséges adatok
   * @param {string} token a felhasználó tokenje
   */
  updateBeneficiary = async (data, token) => {
    const response = await fetch(this.props.serverAddress + "/updatebeneficiary", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const beneficiary = response.json();
    return beneficiary;
  };

  /**
   * Bankkártya beállításainak a módosítását végző API kérés
   * @param {array} data a kérés feldolgozásához szükséges adatok
   * @param {string} token a felhasználó tokenje
   */
  updateCreditCard = async (data, token) => {
    const response = await fetch(this.props.serverAddress + "/updatecreditcard", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
    return response;
  };

  /**
   * Kedvezményezett törlését végző API kérés
   * @param {array} data a kérés feldolgozásához szükséges adatok
   * @param {string} token a felhasználó tokenje
   */
  deleteBeneficiary = async (data, token) => {
    const response = await fetch(this.props.serverAddress + "/deletebeneficiary", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
    return response;
  };
  /**
   * A bankszámlakivonatok listájának a megjelenítéséhez tartozó API kérés
   * @param {int} id_user a felhasználó azonosítója
   * @param {string} token a felhasználó tokenje
   */
  getStatements = async (id_user, token) => {
    const response = await fetch(this.props.serverAddress + "/getstatements", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id_user }),
    });
    const statements = response.json();
    return statements;
  };

  /**
   * A kedvezményezettek listájának a megjelenítéséhez tartozó API kérés
   * @param {int} id_user a felhasználó azonosítója
   * @param {string} token a felhasználó tokenje
   */
  getBeneficiaries = async (id_user, token) => {
    const response = await fetch(this.props.serverAddress + "/getbeneficiaries", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id_user }),
    });
    const beneficiaries = response.json();
    return beneficiaries;
  };

  /**
   * A felhasználó megtakarításait megjelenítő listához tartozó API kérés
   * @param {int} id_user a felhasználó azonosítója
   * @param {string} token a felhasználó tokenje
   */
  getSavings = async (id_user, token) => {
    const response = await fetch(this.props.serverAddress + "/getsavings", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id_user }),
    });
    const savings = response.json();
    return savings;
  };

  /**
   * Afelhasználó állandó megbízásainak a megjelenítéséhez tartozó API kérés
   * @param {int} id_user a felhasználó azonosítója
   * @param {string} token a felhasználó tokenje
   */
  getRecurringTransfers = async (id_user, token) => {
    const response = await fetch(this.props.serverAddress + "/getrecurringtransfers", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id_user }),
    });
    const recurringTransfers = response.json();
    return recurringTransfers;
  };

  /**
   * A falhasználó bankkártyáinak a megjelenítéséhez tartozó API kérés
   * @param {int} id_user a felhasználó azonosítója
   * @param {string} token a felhasználó tokenje
   */
  getCreditCards = async (id_user, token) => {
    const response = await fetch(this.props.serverAddress + "/getcreditcards", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id_user }),
    });
    const creditCards = response.json();
    return creditCards;
  };

  /**
   * A bankszámla-egyenlegek megjelenítéséhez tartozó API kérés
   * @param {int} id_user a felhasználó azonosítója
   * @param {string} token a felhasználó tokenje
   */
  getAccounts = async (id_user, token) => {
    const response = await fetch(this.props.serverAddress + "/getaccounts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id_user }),
    }).then();
    const accountBalances = response.json();
    return accountBalances;
  };

  /**
   * A valuta árfolyamok megjelenítéséhez tartozó API kérés
   */
  getCurrencies = async () => {
    const response = await fetch(this.props.serverAddress + "/getcurrencies");
    const currencies = response.json();
    return currencies;
  };

  /**
   * A deviza árfolyamok megjelenítéséhez tartozó API kérés
   */
  getForeignCurrencies = async () => {
    const response = await fetch(this.props.serverAddress + "/getforeigncurrencies");
    const currencies = response.json();
    return currencies;
  };

  /**
   * A bankfiókok listájának a megjelenítéséhez tartozó API kérés
   */
  getBranches = async () => {
    const response = await fetch(this.props.serverAddress + "/getbranches");
    const branches = response.json();
    return branches;
  };

  /**
   * A bankautomaták listájának a megjelenítéséhez tartozó API kérés
   */
  getAtms = async () => {
    const response = await fetch(this.props.serverAddress + "/getatms");
    const atms = response.json();
    return atms;
  };

  render() {
    return <ApiContext.Provider value={this.state}>{this.props.children}</ApiContext.Provider>;
  }
}

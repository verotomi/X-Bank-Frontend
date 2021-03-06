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
   * A felhaszn??l?? bejelentkez??s??hez kapcsol??d?? API k??r??s
   * @param {array} credentials JSON t??mb, a felhaszn??l?? neve ??s jelszava
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
   * A felhaszn??l?? kijelentkez??s??t v??gz?? API k??r??s
   * @param {array} credentials JSON t??mb, a felhaszn??l?? neve ??s jelszava
   * @param {string} token a felhaszn??l?? tokenje
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
   * A jelsz??v??ltoztat??st v??gz?? API k??r??s
   * @param {array} credentials JSON t??mb, a felhaszn??l?? neve ??s jelszava
   * @param {string} token a felhaszn??l?? tokenje
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
   * A p??nz??gyi statisztikai kimutat??s megjelen??t??s??hez tartoz?? API k??r??s
   * @param {array} credentials JSON t??mb, a felhaszn??l?? neve ??s jelszava
   * @param {string} token a felhaszn??l?? tokenje
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
        console.error(`Could not get data: ${error}`);
      });
  };

  /**
   * A sz??mlat??rt??net megjelen??t??s??hez tartoz?? API k??r??s
   * @param {array} data a k??r??s feldolgoz??s??hoz sz??ks??ges adatok
   * @param {string} token a felhaszn??l?? tokenje
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
   * ??j megtakar??t??s r??gz??t??s??hez tartoz?? API k??r??s
   * @param {array} data a k??r??s feldolgoz??s??hoz sz??ks??ges adatok
   * @param {string} token a felhaszn??l?? tokenje
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
   * A lehets??ges megtakar??t??si m??dozatok lek??rdez??s??t v??gz?? API k??r??s
   * @param {string} token a felhaszn??l?? tokenje
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
   * Egy megtakar??t??s felt??r??s??hez tartoz?? API k??r??s
   * @param {array} data a k??r??s feldolgoz??s??hoz sz??ks??ges adatok
   * @param {string} token a felhaszn??l?? tokenje
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
   * ??lland?? ??tutal??si megb??z??s m??do??s??t??s??t v??gz?? API k??r??s
   * @param {array} data a k??r??s feldolgoz??s??hoz sz??ks??ges adatok
   * @param {string} token a felhaszn??l?? tokenje
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
   * ??lland?? ??tutal??si megb??z??s t??rl??s??t v??gz?? API k??r??s
   * @param {array} data a k??r??s feldolgoz??s??hoz sz??ks??ges adatok
   * @param {string} token a felhaszn??l?? tokenje
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
   * ??j ??lland?? ??tutal??si megb??z??s r??gz??t??s??t v??gz?? API k??r??s
   * @param {array} data a k??r??s feldolgoz??s??hoz sz??ks??ges adatok
   * @param {string} token a felhaszn??l?? tokenje
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
   * ??tutal??si megb??z??s ind??t??s??t v??gz?? API k??r??s
   * @param {array} data a k??r??s feldolgoz??s??hoz sz??ks??ges adatok
   * @param {string} token a felhaszn??l?? tokenje
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
   * ??j kedvezm??nyezett r??gz??t??s??t v??gz?? API k??r??s
   * @param {array} data a k??r??s feldolgoz??s??hoz sz??ks??ges adatok
   * @param {string} token a felhaszn??l?? tokenje
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
   * Megl??v?? kedvezm??nyezett m??dos??t??s??t v??gz?? API k??r??s
   * @param {array} data a k??r??s feldolgoz??s??hoz sz??ks??ges adatok
   * @param {string} token a felhaszn??l?? tokenje
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
   * Bankk??rtya be??ll??t??sainak a m??dos??t??s??t v??gz?? API k??r??s
   * @param {array} data a k??r??s feldolgoz??s??hoz sz??ks??ges adatok
   * @param {string} token a felhaszn??l?? tokenje
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
   * Kedvezm??nyezett t??rl??s??t v??gz?? API k??r??s
   * @param {array} data a k??r??s feldolgoz??s??hoz sz??ks??ges adatok
   * @param {string} token a felhaszn??l?? tokenje
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
   * A banksz??mlakivonatok list??j??nak a megjelen??t??s??hez tartoz?? API k??r??s
   * @param {int} id_user a felhaszn??l?? azonos??t??ja
   * @param {string} token a felhaszn??l?? tokenje
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
   * A kedvezm??nyezettek list??j??nak a megjelen??t??s??hez tartoz?? API k??r??s
   * @param {int} id_user a felhaszn??l?? azonos??t??ja
   * @param {string} token a felhaszn??l?? tokenje
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
   * A felhaszn??l?? megtakar??t??sait megjelen??t?? list??hoz tartoz?? API k??r??s
   * @param {int} id_user a felhaszn??l?? azonos??t??ja
   * @param {string} token a felhaszn??l?? tokenje
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
   * Afelhaszn??l?? ??lland?? megb??z??sainak a megjelen??t??s??hez tartoz?? API k??r??s
   * @param {int} id_user a felhaszn??l?? azonos??t??ja
   * @param {string} token a felhaszn??l?? tokenje
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
   * A falhaszn??l?? bankk??rty??inak a megjelen??t??s??hez tartoz?? API k??r??s
   * @param {int} id_user a felhaszn??l?? azonos??t??ja
   * @param {string} token a felhaszn??l?? tokenje
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
   * A banksz??mla-egyenlegek megjelen??t??s??hez tartoz?? API k??r??s
   * @param {int} id_user a felhaszn??l?? azonos??t??ja
   * @param {string} token a felhaszn??l?? tokenje
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
   * A valuta ??rfolyamok megjelen??t??s??hez tartoz?? API k??r??s
   */
  getCurrencies = async () => {
    const response = await fetch(this.props.serverAddress + "/getcurrencies");
    const currencies = response.json();
    return currencies;
  };

  /**
   * A deviza ??rfolyamok megjelen??t??s??hez tartoz?? API k??r??s
   */
  getForeignCurrencies = async () => {
    const response = await fetch(this.props.serverAddress + "/getforeigncurrencies");
    const currencies = response.json();
    return currencies;
  };

  /**
   * A bankfi??kok list??j??nak a megjelen??t??s??hez tartoz?? API k??r??s
   */
  getBranches = async () => {
    const response = await fetch(this.props.serverAddress + "/getbranches");
    const branches = response.json();
    return branches;
  };

  /**
   * A bankautomat??k list??j??nak a megjelen??t??s??hez tartoz?? API k??r??s
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

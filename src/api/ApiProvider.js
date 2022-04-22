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
  getAccountBalances: () => {},
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
      getAccountBalances: this.getAccountBalances,
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

  loginUser = async (credentials) => {
    return await fetch(this.props.serverAddress + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  };

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

  getAccountBalances = async (id_user, token) => {
    const response = await fetch(this.props.serverAddress + "/getaccountbalances", {
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

  getCurrencies = async () => {
    const response = await fetch(this.props.serverAddress + "/getcurrencies");
    const currencies = response.json();
    return currencies;
  };

  getForeignCurrencies = async () => {
    const response = await fetch(this.props.serverAddress + "/getforeigncurrencies");
    const currencies = response.json();
    return currencies;
  };

  getBranches = async () => {
    const response = await fetch(this.props.serverAddress + "/getbranches");
    const branches = response.json();
    return branches;
  };

  getAtms = async () => {
    const response = await fetch(this.props.serverAddress + "/getatms");
    const atms = response.json();
    return atms;
  };

  render() {
    return <ApiContext.Provider value={this.state}>{this.props.children}</ApiContext.Provider>;
  }
}

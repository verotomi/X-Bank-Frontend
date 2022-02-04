import { createContext, Component } from "react";

export const ApiContext = createContext({
  apiToken: null,
  getCurrencies: () => {}, 
  getForeignCurrencies: () => {}, 
  getBranches: () => {}, 
  getAtms: () => {}, 
  getAccountBalances: () => {}, 
  getSavings: () => {}, 
  getBeneficiaries: () => {}, 
  getStatements: () => {},
  createOneTimeTransfer: () => {},
});

export class ApiProvider extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      apiToken: '',
      getCurrencies: this.getCurrencies,
      getForeignCurrencies: this.getForeignCurrencies,
      getBranches: this.getBranches,
      getAtms: this.getAtms,
      getAccountBalances: this.getAccountBalances,
      getSavings: this.getSavings,
      getBeneficiaries: this.getBeneficiaries,
      getStatements: this.getStatements,
      createOneTimeTransfer: this.createOneTimeTransfer,
    }
  }

  createOneTimeTransfer = async (data, token) => {
    const response = await fetch(this.props.serverAddress + '/api/transferonetime', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    // Hibakezelés
    console.log(response)
    const onetimetransfer = response.json();
    // Hibakezelés
    return onetimetransfer
  }

  getStatements = async (id_user, token) => {
    const response = await fetch(this.props.serverAddress + '/api/getstatements', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      //body: '{"id_user": 1}'
      body: JSON.stringify({id_user})
    });
    // Hibakezelés
    const statements = response.json();
    // Hibakezelés
    return statements
  }

  getBeneficiaries = async (id_user, token) => {
    const response = await fetch(this.props.serverAddress + '/api/getbeneficiaries', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      //body: '{"id_user": 1}'
      body: JSON.stringify({id_user})
    });
    // Hibakezelés
    const beneficiaries = response.json();
    // Hibakezelés
    return beneficiaries
  }
  
  getSavings = async (id_user, token) => {
    const response = await fetch(this.props.serverAddress + '/api/getsavings', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      //body: '{"id_user": 1}'
      body: JSON.stringify({id_user})
    });
    // Hibakezelés
    const savings = response.json();
    // Hibakezelés
    return savings
  }

  getAccountBalances = async (id_user, token) => {
    const response = await fetch(this.props.serverAddress + '/api/getaccountbalances', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      //body: '{"id_user": 1}'
      body: JSON.stringify({id_user})
    });
    // Hibakezelés
    const currencies = response.json();
    // Hibakezelés
    return currencies
  }

  getCurrencies = async () => {
    //const response = await fetch('http://localhost/15WL/X-Bank/_Backend/X-Bank/api/getcurrencies');
    const response = await fetch(this.props.serverAddress + '/api/getcurrencies');
    // Hibakezelés
    const currencies = response.json();
    // Hibakezelés
    return currencies
  }

  getForeignCurrencies = async () => {
    const response = await fetch(this.props.serverAddress + '/api/getforeigncurrencies');
    // Hibakezelés
    const currencies = response.json();
    // Hibakezelés
    return currencies
  }

  getBranches = async () => {
    const response = await fetch(this.props.serverAddress + '/api/getbranches');
    // Hibakezelés
    const branches = response.json();
    // Hibakezelés
    return branches
  }

  getAtms = async () => {
    const response = await fetch(this.props.serverAddress + '/api/getatms');
    // Hibakezelés
    const atms = response.json();
    // Hibakezelés
    return atms
  }

  render(){
    return <ApiContext.Provider value={this.state}>
      { this.props.children }
    </ApiContext.Provider>
  }
}
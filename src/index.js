import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ApiProvider } from './api/api'


const initialState = {
  //token: ["XBank", "Hajrá"] 
  //   {"id":1,"firstname":"Tamás","lastname":"Verovszki","netbank_id":11111111,
  //   "created_on":"2018-12-01 12:00:00","last_login":"2022-01-18 11:33:14","token":"af9b0956"}

  id: 0,
  firstname: "Zahedli Krisztina",
  lastname: 'Scsipovicscné',
  netbank_id: '0000',
  created_on: '2000-01-01 00:00:00',
  last_login: '2000-12-31 23:59:59',
  token: '',
  isSidebarClose: false,
  isSidebarItemClose: false,
  isSidebarItem2Close: false,
  isSidebarItem3Close: false,
  accounts: [],
  savings: [],
  };
const store = createStore(reducer); // a store tartalma valamelyik redux keretrendszer-beli fájlban van tárolva egy változóban, nem pedig a mi kódunk valamelyik változójában!

function reducer(state = initialState, action) {
  
  const isSidebarClose = state.isSidebarClose
  const isSidebarItemClose = state.isSidebarItemClose
  const isSidebarItem2Close = state.isSidebarItem2Close
  const isSidebarItem3Close = state.isSidebarItem3Close
  switch (action.type) {
    case "LOGIN":
      return {...state,
        id: action.data.id,
        firstname: action.data.firstname,
        lastname: action.data.lastname,
        netbank_id: action.data.netbank_id,
        last_login: action.data.last_login,
        token: action.data.token
      } 
    case "LOGOUT":
      return initialState
    case "SIDEBAR_CHANGE":
      return {...state,
        isSidebarClose: isSidebarClose? false : true
      }
    case "SIDEBAR_ITEM_CHANGE":
      return {...state,
        isSidebarItemClose: isSidebarItemClose? false : true
      }
    case "SIDEBAR_ITEM_CHANGE_2":
      return {...state,
        isSidebarItem2Close: isSidebarItem2Close? false : true
      }
    case "SIDEBAR_ITEM_CHANGE_3":
      return {...state,
        isSidebarItem3Close: isSidebarItem3Close? false : true
      }
    case "UPDATE_ACCOUNTS":
      return {...state,
        accounts: action.data
      }
    case "UPDATE_SAVINGS":
      return {...state,
        savings: action.data
      }
    case "TRANSFER_ONE_TIME":
      return {...state
      }
    default:
      return state
  }
}

console.log(store.getState()); // ez a kód csak egyszer fog lefutni, emiatt csak egyszer - a legelején fogja kiírni a store tartalmát.  
store.subscribe(() => console.log(store.getState())); // ez egy feliratkozás, ezáltal minden store-változás után lefut ez a kód, és kiíródik a store tartalma. Annak ellenére is, hogy az index.js alapból csak egyszer fut le!

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider serverAddress="http://localhost/15WL/X-Bank/_Backend/X-Bank">
        <Provider store={store}>
          <App />
        </Provider>
      </ApiProvider>
    </React.StrictMode>,
  document.getElementById('root')
);

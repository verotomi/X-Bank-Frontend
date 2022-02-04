import React, { Fragment } from 'react';
import NetbankSidebar from './NetbankSidebar';
import NetbankTitle from "./NetbankTitle";
import NetbankBody from "./NetbankBody";
import NetbankHeader from './NetbankHeader';
import Footer from '../Shared/Footer';
import { connect } from 'react-redux';
import { Link, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Overview from './Overview';
import History from './History';
import BankAccounts from './BankAccounts_NOT_USED_ANYMORE';
import CreditCards from './CreditCards';
import TransferOneTime from './TransferOneTime';
import AccountBalances from './Balances/Balances';
import SavingsList from './Savings/SavingsList';
import BeneficiariesList from './Beneficiaries/BeneficiariesList';
import Statements from './Statements/Statements';
import RecurringTransfersList from './RecurringTransfers/RecurringTransfersList';
import NewRecurringTransfer from './RecurringTransfers/NewRecurringTransfer';
import NewSaving from './Savings/NewSaving';
import NewBeneficiary from './Beneficiaries/NewBeneficiary';


function Netbank(props){
    return(
        <div className={props.isSidebarClose? "toggle-sidebar": ""}>
            <NetbankHeader />
            <NetbankSidebar />
            <main id="main" className="main">
                <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="attekintes" element={<Overview />} />
                    <Route path="egyenleglekerdezes" element={<AccountBalances />} />
                    <Route path="egyszeriutalas" element={<TransferOneTime />} />
                    <Route path="allandomegbizasok" element={<RecurringTransfersList />} />
                    <Route path="ujallandomegbizas" element={<NewRecurringTransfer />} />
                    <Route path="megtakaritasok" element={<SavingsList />} />
                    <Route path="ujmegtakaritas" element={<NewSaving />} />
                    <Route path="szamlatortenet" element={<History />} />
                    <Route path="szamlakivonatok" element={<Statements />} />
                    <Route path="bankkartyak" element={<CreditCards />} />
                    <Route path="kedvezmenyezettek" element={<BeneficiariesList />} />
                    <Route path="ujkedvezmenyezett" element={<NewBeneficiary />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
function mapStateToProps(state) { // ennek más nevet is adhatunk! A lenti connect hatására minden alkalommal meghívódik, ha a store változik
    console.log(state)
    return state 
  }

export default connect(mapStateToProps)(Netbank)
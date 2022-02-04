import React, { Fragment } from 'react';
import MainSidebar from './MainSidebar';
import Currencies from "./Currencies/Currencies";
import ForeignCurrencies from "./ForeignCurrencies/ForeignCurrencies";
import Contact from "./Contact";
import Information from "./Information";
import MobilebankAd from "./MobilebankAd";
import Overview from "./Overview";
import MainHeader from './MainHeader';
import Footer from '../Shared/Footer';
import { connect } from 'react-redux';
import { Link, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Atms from './Atms/Atms';
import Branches from "./Branches/Branches";


function Main(props){
    return(
        <div className={props.isSidebarClose? "toggle-sidebar": ""}>
            <MainHeader />
            <MainSidebar />
            <main id="main" className="main">
                <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="bankfiokok" element={<Branches />} />
                    <Route path="bankautomatak" element={<Atms />} />
                    <Route path="valuta" element={<Currencies />} />
                    <Route path="deviza" element={<ForeignCurrencies />} />
                    <Route path="kapcsolat" element={<Contact />} />
                    <Route path="informacio" element={<Information />} />
                    <Route path="mobilbank" element={<MobilebankAd />} />
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

export default connect(mapStateToProps)(Main)
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Atms from "./Atms/Atms";
import Branches from "./Branches/Branches";
import Contact from "./Contact/Contact";
import Currencies from "./Currencies/Currencies";
import Footer from "../Shared/Footer";
import ForeignCurrencies from "./ForeignCurrencies/ForeignCurrencies";
import Information from "./Information/Information";
import MainHeader from "./MainHeader";
import MainOverview from "./MainOverview/MainOverview";
import MainSidebar from "./MainSidebar";
import MobilebankAd from "./MobilebankAd/MobilebankAd";
import React from "react";

function Main(props) {
  return (
    <div className={props.isSidebarClose ? "toggle-sidebar" : ""}>
      <MainHeader />
      <MainSidebar />
      <main id="main" className="main">
        <Routes>
          <Route path="/" element={<MainOverview />} />
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

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Main);

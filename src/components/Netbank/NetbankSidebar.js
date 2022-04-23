import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleSidebarItem, toggleSidebarItem2, toggleSidebarItem3, toggleSidebar } from "../../actions/actions";
import React, { Fragment, useEffect, useState } from "react";
import SidebarItem from "../Shared/SidebarItem";

function NetbankSidebar(props) {
  const [navLinkAClassname, setNavlinkAClassname] = useState("bi bi-circle");
  const [navLinkBClassname, setNavlinkBClassname] = useState("bi bi-circle");
  const [navLinkCClassname, setNavlinkCClassname] = useState("bi bi-circle");
  const [navLinkDClassname, setNavlinkDClassname] = useState("bi bi-circle");
  const [navLinkEClassname, setNavlinkEClassname] = useState("bi bi-circle");
  const [navLinkFClassname, setNavlinkFClassname] = useState("bi bi-circle");
  const [sidebarItem10Enabled, setSidebarItem10Enabled] = useState(false);
  const [sidebarItem1Enabled, setSidebarItem1Enabled] = useState(true);
  const [sidebarItem2Enabled, setSidebarItem2Enabled] = useState(true);
  const [sidebarItem3Enabled, setSidebarItem3Enabled] = useState(true);
  const [sidebarItem4Enabled, setSidebarItem4Enabled] = useState(true);
  const [sidebarItem5Enabled, setSidebarItem5Enabled] = useState(true);
  const [sidebarItem6Enabled, setSidebarItem6Enabled] = useState(true);
  const [sidebarItem7Enabled, setSidebarItem7Enabled] = useState(true);
  const [sidebarItem8Enabled, setSidebarItem8Enabled] = useState(true);
  const [sidebarItem9Enabled, setSidebarItem9Enabled] = useState(true);

  function handleOnclick(e) {
    e.preventDefault();
    props.toggleSidebarItem();
  }
  
  function handleOnclick2(e) {
    e.preventDefault();
    props.toggleSidebarItem2();
  }

  function handleOnclick3(e) {
    e.preventDefault();
    props.toggleSidebarItem3();
  }
  
  function handleClickA() {
    (window.innerWidth < 600) && props.toggleSidebar();      
    setNavlinkAClassname("bi bi-circle-fill");
    setNavlinkBClassname("bi bi-circle");
    setNavlinkCClassname("bi bi-circle");
    setNavlinkDClassname("bi bi-circle");
    setNavlinkEClassname("bi bi-circle");
    setNavlinkFClassname("bi bi-circle");
  }

  function handleClickB() {
    (window.innerWidth < 600) && props.toggleSidebar();      
    setNavlinkAClassname("bi bi-circle");
    setNavlinkBClassname("bi bi-circle-fill");
    setNavlinkCClassname("bi bi-circle");
    setNavlinkDClassname("bi bi-circle");
    setNavlinkEClassname("bi bi-circle");
    setNavlinkFClassname("bi bi-circle");
  }

  function handleClickC() {
    (window.innerWidth < 600) && props.toggleSidebar();
    setNavlinkAClassname("bi bi-circle");
    setNavlinkBClassname("bi bi-circle");
    setNavlinkCClassname("bi bi-circle-fill");
    setNavlinkDClassname("bi bi-circle");
    setNavlinkEClassname("bi bi-circle");
    setNavlinkFClassname("bi bi-circle");
  }

  function handleClickD() {
    (window.innerWidth < 600) && props.toggleSidebar();
    setNavlinkAClassname("bi bi-circle");
    setNavlinkBClassname("bi bi-circle");
    setNavlinkCClassname("bi bi-circle");
    setNavlinkDClassname("bi bi-circle-fill");
    setNavlinkEClassname("bi bi-circle");
    setNavlinkFClassname("bi bi-circle");
  }

  function handleClickE() {
    (window.innerWidth < 600) && props.toggleSidebar();
    setNavlinkAClassname("bi bi-circle");
    setNavlinkBClassname("bi bi-circle");
    setNavlinkCClassname("bi bi-circle");
    setNavlinkDClassname("bi bi-circle");
    setNavlinkEClassname("bi bi-circle-fill");
    setNavlinkFClassname("bi bi-circle");
  }

  function handleClickF() {
    (window.innerWidth < 600) && props.toggleSidebar();
    setNavlinkAClassname("bi bi-circle");
    setNavlinkBClassname("bi bi-circle");
    setNavlinkCClassname("bi bi-circle");
    setNavlinkDClassname("bi bi-circle");
    setNavlinkEClassname("bi bi-circle");
    setNavlinkFClassname("bi bi-circle-fill");
  }

  useEffect(() => {
    if (props.netbank_id === "admin001") {
      setSidebarItem1Enabled(false);
      setSidebarItem2Enabled(false);
      setSidebarItem3Enabled(false);
      setSidebarItem4Enabled(false);
      setSidebarItem5Enabled(false);
      setSidebarItem6Enabled(false);
      setSidebarItem7Enabled(false);
      setSidebarItem8Enabled(false);
      setSidebarItem9Enabled(false);
      setSidebarItem10Enabled(true);
    }
  }, [props.netbank_id]);

  return (
    <Fragment>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          {sidebarItem1Enabled && (
            <li className="nav-item">
              <SidebarItem
                status={props.accounts.length === 0 ? "disabled" : "active"}
                name="Áttekintés"
                icon="bi bi-card-text"
                link="attekintes"
              />
            </li>
          )}
          {sidebarItem2Enabled && (
            <li className="nav-item">
              <SidebarItem
                status={props.accounts.length === 0 ? "disabled" : "active"}
                name="Egyenleg lekérdezés"
                icon="bi bi-cash-coin"
                link={props.accounts.length === 0 ? "" : "egyenleglekerdezes"}
              />
            </li>
          )}
          {sidebarItem3Enabled && (
            <li className="nav-item">
              <SidebarItem
                status={props.accounts.length === 0 ? "disabled" : "active"}
                name="Egyszeri átutalás"
                icon="bi bi-forward"
                link={props.accounts.length === 0 ? "" : "egyszeriutalas"}
              />
            </li>
          )}
          {sidebarItem4Enabled && (
            <li className="nav-item">
              <a
                className={props.isSidebarItemOpen ? "nav-link" : "nav-link collapsed"}
                onClick={handleOnclick}
                data-bs-target="#components-nav"
                data-bs-toggle="collapse"
                href="."
              >
                <i className="bi bi-arrow-counterclockwise"></i>
                <span>Állandó megbízások</span>
                <i className="bi bi-caret-down ms-auto"></i>
              </a>
              <ul
                style={props.isSidebarItemOpen ? { padding: "5px 0 0 10px" } : { padding: "0px" }}
                id="components-nav"
                className="nav-content"
                data-bs-parent="#sidebar-nav"
              >
                <li
                  style={
                    props.isSidebarItemOpen
                      ? { height: "47.5px" }
                      : { height: "0px", visibility: "hidden", margin: "0px", padding: "0px" }
                  }
                >
                  <NavLink
                    className={props.accounts.length === 0 ? "nav-link-disabled" : "nav-link"}
                    to={props.accounts.length === 0 ? "" : "allandomegbizasok"}
                    onClick={handleClickA}
                  >
                    {props.isSidebarItemOpen && (
                      <div>
                        <i className={navLinkAClassname}></i>Állandó megbízások listája
                      </div>
                    )}
                  </NavLink>
                </li>
                <li
                  style={
                    props.isSidebarItemOpen
                      ? { height: "42.5px" }
                      : { height: "0px", visibility: "hidden", margin: "0px", padding: "0px" }
                  }
                >
                  <NavLink
                    className={props.accounts.length === 0 ? "nav-link-disabled" : "nav-link"}
                    to={props.accounts.length === 0 ? "" : "ujallandomegbizas"}
                    onClick={handleClickB}
                  >
                    {props.isSidebarItemOpen && (
                      <div>
                        <i className={navLinkBClassname}></i>
                        <span>Új állandó megbízás</span>
                      </div>
                    )}
                  </NavLink>
                </li>
              </ul>
            </li>
          )}
          {sidebarItem5Enabled && (
            <li className="nav-item">
              <a
                className={props.isSidebarItem2Open ? "nav-link" : "nav-link collapsed"}
                onClick={handleOnclick2}
                data-bs-target="#components-nav"
                data-bs-toggle="collapse"
                href="."
              >
                <i className="bi bi-piggy-bank"></i>
                <span>Megtakarítások</span>
                <i className="bi bi-caret-down ms-auto"></i>
              </a>
              <ul
                style={props.isSidebarItem2Open ? { padding: "5px 0 0 10px" } : { padding: "0px" }}
                id="components-nav"
                className="nav-content"
                data-bs-parent="#sidebar-nav"
              >
                <li
                  style={
                    props.isSidebarItem2Open
                      ? { height: "47.5px" }
                      : { height: "0px", visibility: "hidden", margin: "0px", padding: "0px" }
                  }
                >
                  <NavLink
                    className={props.accounts.length === 0 ? "nav-link-disabled" : "nav-link"}
                    to={props.accounts.length === 0 ? "" : "megtakaritasok"}
                    onClick={handleClickC}
                  >
                    {props.isSidebarItem2Open && (
                      <div>
                        <i className={navLinkCClassname}></i>
                        <span>Megtakarítások listája</span>
                      </div>
                    )}
                  </NavLink>
                </li>
                <li
                  style={
                    props.isSidebarItem2Open
                      ? { height: "42.5px" }
                      : { height: "0px", visibility: "hidden", margin: "0px", padding: "0px" }
                  }
                >
                  <NavLink
                    className={props.accounts.length === 0 ? "nav-link-disabled" : "nav-link"}
                    to={props.accounts.length === 0 ? "" : "ujmegtakaritas"}
                    onClick={handleClickD}
                  >
                    {props.isSidebarItem2Open && (
                      <div>
                        <i className={navLinkDClassname}></i>
                        <span>Új megtakarítás</span>
                      </div>
                    )}
                  </NavLink>
                </li>
              </ul>
            </li>
          )}
          {sidebarItem6Enabled && (
            <li className="nav-item">
              <SidebarItem
                status={props.accounts.length === 0 ? "disabled" : "active"}
                name="Számlatörténet"
                icon="bi bi-clock-history"
                link="szamlatortenet"
              />
            </li>
          )}
          {sidebarItem7Enabled && (
            <li className="nav-item">
              <SidebarItem
                status={props.accounts.length === 0 ? "disabled" : "active"}
                name="Bankszámla kivonatok"
                icon="bi bi-file-earmark-text"
                link="szamlakivonatok"
              />
            </li>
          )}
          {sidebarItem8Enabled && (
            <li className="nav-item">
              <SidebarItem
                status={props.accounts.length === 0 ? "disabled" : "active"}
                name="Bankkártyák kezelése"
                icon="bi bi-credit-card"
                link="bankkartyak"
              />
            </li>
          )}
          {sidebarItem9Enabled && (
            <li className="nav-item">
              <a
                className={props.isSidebarItem3Open ? "nav-link" : "nav-link collapsed"}
                onClick={handleOnclick3}
                data-bs-target="#components-nav"
                data-bs-toggle="collapse"
                href="."
              >
                <i className="bi bi-people"></i>
                <span>Kedvezményezettek</span>
                <i className="bi bi-caret-down ms-auto"></i>
              </a>
              <ul
                style={props.isSidebarItem3Open ? { padding: "5px 0 0 10px" } : { padding: "0px" }}
                id="components-nav"
                className="nav-content"
                data-bs-parent="#sidebar-nav"
              >
                <li
                  style={
                    props.isSidebarItem3Open
                      ? { height: "47.5px" }
                      : { height: "0px", visibility: "hidden", margin: "0px", padding: "0px" }
                  }
                >
                  <NavLink
                    className={props.accounts.length === 0 ? "nav-link-disabled" : "nav-link"}
                    to={props.accounts.length === 0 ? "" : "kedvezmenyezettek"}
                    onClick={handleClickE}
                  >
                    {props.isSidebarItem3Open && (
                      <div>
                        <i className={navLinkEClassname}></i>
                        <span>Kedvezményezettek listája</span>
                      </div>
                    )}
                  </NavLink>
                </li>
                <li
                  style={
                    props.isSidebarItem3Open
                      ? { height: "42.5px" }
                      : { height: "0px", visibility: "hidden", margin: "0px", padding: "0px" }
                  }
                >
                  <NavLink
                    className={props.accounts.length === 0 ? "nav-link-disabled" : "nav-link"}
                    to={props.accounts.length === 0 ? "" : "ujkedvezmenyezett"}
                    onClick={handleClickF}
                  >
                    {props.isSidebarItem3Open && (
                      <div>
                        <i className={navLinkFClassname}></i>
                        <span>Új kedvezményezett</span>
                      </div>
                    )}
                  </NavLink>
                </li>
              </ul>
            </li>
          )}
          {sidebarItem10Enabled && (
            <li className="nav-item">
              <SidebarItem status="active" name="Statisztika" icon="bi bi-table" link="statisztika" />
            </li>
          )}
        </ul>
      </aside>
    </Fragment>
  );
}

const mapDispatchToProps = {
  toggleSidebarItem,
  toggleSidebarItem2,
  toggleSidebarItem3,
  toggleSidebar,
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(NetbankSidebar);

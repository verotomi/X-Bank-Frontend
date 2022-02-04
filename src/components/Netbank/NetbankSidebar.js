import React, { Fragment } from "react";
import { Link, NavLink, Route, Routes } from 'react-router-dom';

import { connect } from "react-redux";
import SidebarItem from '../Shared/SidebarItem';
import { toggleSidebarItem } from '../../actions/actions'
import { toggleSidebarItem2 } from '../../actions/actions'
import { toggleSidebarItem3 } from '../../actions/actions'


function NetbankSidebar (props) {

  function handleOnclick(e){
    e.preventDefault()
    props.toggleSidebarItem()
  }
  function handleOnclick2(e){
    e.preventDefault()
    props.toggleSidebarItem2()
  }
  function handleOnclick3(e){
    e.preventDefault()
    props.toggleSidebarItem3()
  }

    return (
      <Fragment>
        <aside id="sidebar" className="sidebar">
          <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-item">
              <SidebarItem name="Áttekintés" icon="ri ri-home-2-line" link="attekintes"/>
            </li>
            
            <li className="nav-item">
              <SidebarItem name="Egyenleg lekérdezés" icon="bi bi-bank2" link="egyenleglekerdezes"/>
            </li>
            <li className="nav-item">
              <SidebarItem name="Egyszeri átutalás" icon="bi bi-currency-euro" link="egyszeriutalas"/>
            </li>
            <li class="nav-item">
              <a className="nav-link collapsed"  onClick={handleOnclick} data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-currency-exchange"></i><span>Álladó megbízások</span><i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul id="components-nav" className={props.isSidebarItemClose? "nav-content collapse show": "nav-content collapse"} data-bs-parent="#sidebar-nav">
                <li>
                 <NavLink to="allandomegbizasok">
                    <i className="bi bi-circle"></i><span>Állandó megbízások listája</span>
                  </NavLink>
                </li>
                <li>
                <NavLink to="ujallandomegbizas">
                    <i className="bi bi-circle"></i><span>Új állandó megbízás rögzítése</span>
                    </NavLink>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a className="nav-link collapsed"  onClick={handleOnclick2} data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-cash-stack"></i><span>Megtakarítások</span><i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul id="components-nav" className={props.isSidebarItem2Close? "nav-content collapse show": "nav-content collapse"} data-bs-parent="#sidebar-nav">
                <li>
                 <NavLink to="megtakaritasok">
                    <i className="bi bi-circle"></i><span>Megtakarítások listája</span>
                  </NavLink>
                </li>
                <li>
                <NavLink to="ujmegtakaritas">
                    <i className="bi bi-circle"></i><span>Új megtakarítás rögzítése</span>
                    </NavLink>
                </li>
              </ul>
            </li>
            <li  className="nav-item">
              <SidebarItem name="Számlatörténet" icon="bx bx-mobile-alt" link="szamlatortenet"/>
            </li> 
            <li  className="nav-item">
              <SidebarItem name="Bankszámla kivonatok" icon="bi bi-bank2" link="szamlakivonatok"/>
            </li> 
            <li  className="nav-item">
              <SidebarItem name="Bankkártyák kezelése" icon="bi bi-info-square" link="bankkartyak"/>
            </li> 

            <li class="nav-item">
              <a className="nav-link collapsed"  onClick={handleOnclick3} data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                <i className="ri-contacts-line"></i><span>Kedvezményezettek</span><i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul id="components-nav" className={props.isSidebarItem3Close? "nav-content collapse show": "nav-content collapse"} data-bs-parent="#sidebar-nav">
                <li>
                 <NavLink to="kedvezmenyezettek">
                    <i className="bi bi-circle"></i><span>Kedvezményezettek listája</span>
                  </NavLink>
                </li>
                <li>
                <NavLink to="ujkedvezmenyezett">
                    <i className="bi bi-circle"></i><span>Új kedvezményezett rögzítése</span>
                    </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </aside>
      </Fragment>
    );
  }
const mapDispatchToProps = {
  toggleSidebarItem,
  toggleSidebarItem2,
  toggleSidebarItem3
}
function mapStateToProps(state) { // ennek más nevet is adhatunk! A lenti connect hatására minden alkalommal meghívódik, ha a store változik
  console.log(state)
  return state 
}

export default connect(mapStateToProps, mapDispatchToProps)(NetbankSidebar)
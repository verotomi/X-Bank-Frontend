import React, { Fragment } from "react";
import SidebarItem from '../Shared/SidebarItem';

export default class MainSidebar extends React.Component {
  render(){  
    return (
      <Fragment>
        <aside id="sidebar" className="sidebar">
          <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-item">
              <SidebarItem name="Főoldal" icon="ri ri-home-2-line" link=""/>
            </li>
            <li className="nav-item">
              <SidebarItem name="Bankfiókok" icon="bi bi-bank2" link="bankfiokok"/>
            </li>
            <li  className="nav-item">
              <SidebarItem name="Bankautomaták" icon="bi bi-cash-stack" link="bankautomatak"/>
            </li>
            <li className="nav-item">
              <SidebarItem name="Valuta árfolyamok" icon="bi bi-currency-euro" link="valuta"/>
            </li>
            <li  className="nav-item">
              <SidebarItem name="Deviza árfolyamok" icon="bi bi-currency-exchange" link="deviza"/>
            </li> 
            <li  className="nav-item">
              <SidebarItem name="Kapcsolat" icon="ri-contacts-line" link="kapcsolat"/>
            </li> 
            <li  className="nav-item">
              <SidebarItem name="Információk" icon="bi bi-info-square" link="informacio"/>
            </li> 
            <li  className="nav-item">
              <SidebarItem name="Mobilbank" icon="bx bx-mobile-alt" link="mobilbank"/>
            </li> 
          </ul>
        </aside>
      </Fragment>
    );
  }
}
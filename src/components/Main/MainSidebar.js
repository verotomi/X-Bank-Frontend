import React, { Fragment } from "react";
import SidebarItem from "../Shared/SidebarItem";

/**
 * A bejelentkezés nélküli felület oldalmenüje
 */
export default class MainSidebar extends React.Component {
  render() {
    return (
      <Fragment>
        <aside id="sidebar" className="sidebar">
          <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-item">
              <SidebarItem status="active" name="Főoldal" icon="bi bi-house" link="" />
            </li>
            <li className="nav-item">
              <SidebarItem status="active" name="Bankfiókok" icon="bi bi-bank2" link="bankfiokok" />
            </li>
            <li className="nav-item">
              <SidebarItem status="active" name="Bankautomaták" icon="bi bi-cash-stack" link="bankautomatak" />
            </li>
            <li className="nav-item">
              <SidebarItem status="active" name="Valuta árfolyamok" icon="bi bi-currency-euro" link="valuta" />
            </li>
            <li className="nav-item">
              <SidebarItem status="active" name="Deviza árfolyamok" icon="bi bi-currency-dollar" link="deviza" />
            </li>
            <li className="nav-item">
              <SidebarItem status="active" name="Kapcsolat" icon="bi bi-envelope" link="kapcsolat" />
            </li>
            <li className="nav-item">
              <SidebarItem status="active" name="Információk" icon="bi bi-info-square" link="informacio" />
            </li>
            <li className="nav-item">
              <SidebarItem status="active" name="Mobilbank" icon="bi bi-phone" link="mobilbank" />
            </li>
          </ul>
        </aside>
      </Fragment>
    );
  }
}

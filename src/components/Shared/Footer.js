import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Footer extends React.Component {
  render() {
    return <>
      <footer id="footer" className="footer">
        <div className="copyright">
          2021-2022 &copy; Készítette <strong><span>Verovszki Tamás</span></strong>. Minden jog fenntartva!
        </div>
      </footer>
      <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
    </>;
  }
}

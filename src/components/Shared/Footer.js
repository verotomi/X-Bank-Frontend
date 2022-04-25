import React, { Fragment } from "react";
import { GO_BACK_TO_TOP } from "../../assets/config/config";

/**
 * Lábléc
 */
export default class Footer extends React.Component {
  componentDidMount() {
    this.goBackToTop();
  }

  goBackToTop() {
    const onscroll = (e, listener) => {
      e.addEventListener("scroll", listener);
    };
    const select = (e, all = false) => {
      e = e.trim();
      if (all) {
        return [...document.querySelectorAll(e)];
      } else {
        return document.querySelector(e);
      }
    };
    let backtotop = select(".go-back-to-top");
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > GO_BACK_TO_TOP) {
          backtotop.classList.add("active");
        } else {
          backtotop.classList.remove("active");
        }
      };
      window.addEventListener("load", toggleBacktotop);
      onscroll(document, toggleBacktotop);
    }
  }

  render() {
    return (
      <Fragment>
        <footer id="footer" className="footer">
          <div className="copyright">
            2021-2022 &copy; Készítette{" "}
            <strong>
              <span>Verovszki Tamás</span>
            </strong>
          </div>
        </footer>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="go-back-to-top d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-arrow-up-short"></i>
        </button>
      </Fragment>
    );
  }
}

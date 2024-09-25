import React, { useState } from "react";
import about from "../../../assets/nav/aboutUs.svg";
import how from "../../../assets/nav/how.svg";
import support from "../../../assets/nav/support.svg";
import usa from "../../../assets/nav/usa.png";
import china from "../../../assets/nav/china.png";
import arab from "../../../assets/nav/arab.png";
import arrow from "../../../assets/arrowgrey.svg";
import "./Nav.scss";

const Nav = () => {
  const [openSelected, setOpenSelected] = useState(false);
  function handleMouseEnter() {
    setOpenSelected(true);
  }
  function handleMouseLeave() {
    setOpenSelected(false);
  }

  return (
    <div className="container_nav">
      <div className="wrap_nav">
        <div className="content">
          <div className="nav">
            <div className="link">
              <div className="_img">
                <img src={about} alt="about" />
              </div>
              <p>About Us</p>
            </div>
            <div className="link">
              <div className="_img">
                <img src={how} alt="about" />
              </div>
              <p>How To Invest</p>
            </div>
            <div className="link">
              <div className="_img">
                <img src={support} alt="about" />
              </div>
              <p>Support</p>
            </div>
          </div>
          <div
            className="select_lang"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="select_default">
              <div className="_img">
                <img src={usa} alt="eng" />
              </div>
              <p>
                EN
                <img src={arrow} alt="arrow" />
              </p>
            </div>
            {openSelected && (
              <div className="wrapper_options">
                <div className="option">
                  <div className="_img">
                    <img src={china} alt="eng" />
                  </div>
                  <p>CH</p>
                </div>
                <div className="option">
                  <div className="_img">
                    <img src={arab} alt="eng" />
                  </div>
                  <p>AN</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;

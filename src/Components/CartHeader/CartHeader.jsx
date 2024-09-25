import React, { useEffect } from "react";
import "./CartHeader.scss";

const CartHeader = ({ cart, setSlideActive, slideActive }) => {
  const cartLength = cart.length;
  const sistemaActive = +cartLength > 2 ? "active" : "";

  useEffect(() => {
    if (cartLength === 1) setSlideActive("single");
    if (cartLength > 1) setSlideActive("parlay");
    if (cartLength === 0) setSlideActive(false);
  }, [cart]);

  return (
    <>
      <div className="header_cart">
        <div
          className={`single ${
            slideActive === "single" ? "active select" : ""
          } `}
        >
          Single <span>{slideActive === "single" ? 1 : 0}</span>
        </div>
        <div
          className={`parlay ${
            slideActive === "parlay" ? "active select" : ""
          }`}
          onClick={() => {
            if (slideActive === "system") {
              setSlideActive("parlay");
            }
          }}
        >
          Parlay<span>{slideActive === "parlay" ? cartLength : "0"}</span>
        </div>
        <div
          className={`system ${sistemaActive} ${
            slideActive === "system" ? "select" : ""
          } `}
          onClick={() => {
            if (sistemaActive) {
              setSlideActive("system");
            }
          }}
        >
          System<span>{slideActive === "system" ? cartLength : 0}</span>
        </div>
      </div>
    </>
  );
};

export default CartHeader;

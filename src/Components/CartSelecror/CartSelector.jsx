import React, { useState } from "react";
import arrow from "../../assets/arrowblack.svg";
import "./CartSelector.scss";

const selectOption = ["Accept any odds", "Accept higer odds"];

const CartSelector = () => {
  const [indexOption, setIndexOption] = useState(0);
  const [openOption, setOpenOption] = useState(false);
  return (
    <div className="container_selecror_cart">
      <div
        className="section_cart"
        onClick={() => setOpenOption((prev) => !prev)}
      >
        <p>{selectOption[indexOption]}</p>
        <img
          src={arrow}
          alt="arrow"
          className={openOption ? "openOption" : null}
        />
      </div>
      {openOption && (
        <div className="wrapper_option">
          <div className="optionCart">
            {selectOption.map((item, index) => {
              return (
                <div
                  className={indexOption === index ? "selected" : null}
                  key={index}
                  onClick={() => {
                    setIndexOption(index);
                    setOpenOption(false);
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSelector;

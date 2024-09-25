import React, { useState } from "react";
import "./CartCalc.scss";

const CartCalc = ({ cart, slideActive }) => {
  const allFactor = (
    Math.round(cart.reduce((sum, item) => sum + +item.factor, 0) * 100) / 100
  ).toFixed(2);
  const [value, setValue] = useState(0);
  const [check, setChecked] = useState(false);

  const shareFactor = cart.length;

  return (
    <div className="calc_container">
      <div className="info">
        <div className="total_odds">
          <p className="text">Total Odds</p>
          <p className="num">
            {slideActive === "system" && !check ? "-" : allFactor}
          </p>
        </div>
        <div className="potential">
          <p className="text">POTENTIAL PAYOUT</p>
          <p className="num">
            {slideActive === "system"
              ? check
                ? Math.round(allFactor * value * 100) / 100
                : 0
              : Math.round(allFactor * value * 100) / 100}
          </p>
        </div>
      </div>
      <div className="ineractive">
        <p>Per Bet:</p>
        <div className="cash">
          <input
            type="number"
            placeholder="0"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
          <div className="currency">₺</div>
        </div>
      </div>
      {slideActive === "system" && (
        <div className="checkFactor">
          <p>Combinations Count:</p>
          <div className="check">
            <input
              type="checkbox"
              id="check"
              checked={check}
              onChange={(event) => {
                setChecked(event.target.checked);
              }}
            />
            <label htmlFor="check">
              System 1/{shareFactor} - ({shareFactor} Odds)
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartCalc;

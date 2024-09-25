import React from "react";
import { useDispatch } from "react-redux";
import { setStatusStake } from "../../store/slice/selectEventsSlice";
import { setCart, removeItemCart } from "../../store/slice/cartSLice";
import "./SpanStakes.scss";

const SpanStakes = ({ value }) => {
  const dispatch = useDispatch();
  function setCartStakeSpan() {
    dispatch(
      setStatusStake({ idStake: value.id, statusStake: !value.isActive })
    );
    if (!value.isActive) {
      dispatch(setCart(value));
    } else {
      dispatch(removeItemCart(value.id));
    }
  }

  return (
    <div
      className="wrapper_span"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <span
        onClick={setCartStakeSpan}
        className={`stakeNumbers ${value.isActive ? "active" : ""} `}
      >
        {value.factor}
      </span>
    </div>
  );
};

export default SpanStakes;

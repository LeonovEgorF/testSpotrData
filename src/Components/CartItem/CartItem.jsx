import React from "react";
import { useDispatch } from "react-redux";
import { removeItemCart } from "../../store/slice/cartSLice";
import { setStatusStake } from "../../store/slice/selectEventsSlice";
import closeIcon from "../../assets/closeblack.svg";
import "./CartItem.scss";

const CartItem = ({ factor, id, stake, title, titleGameType, nameGame }) => {
  const dispatch = useDispatch();
  const titleGameArr = nameGame.split("-");

  return (
    <div className="container_item-cart">
      <div className="info_item">
        <div className="title_item">
          {titleGameArr[0]}
          <br />-{titleGameArr[1]}
        </div>
        <div className="descr_item">
          <div className="wr_game">
            <div className="type_game">{titleGameType}</div>
            <div className="stake_game">
              Wager:{title}
              <span>{stake}</span>
            </div>
          </div>
          <div className="factor">{factor}</div>
        </div>
      </div>
      <div
        className="remove_item"
        onClick={() => {
          dispatch(removeItemCart(id));
          dispatch(setStatusStake({ idStake: id, statusStake: false }));
        }}
      >
        <img src={closeIcon} alt="close" />
      </div>
    </div>
  );
};

export default CartItem;

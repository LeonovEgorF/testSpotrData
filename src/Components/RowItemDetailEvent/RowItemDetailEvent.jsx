import { useDispatch } from "react-redux";
import { setStatusStake } from "../../store/slice/selectEventsSlice";
import { setCart, removeItemCart } from "../../store/slice/cartSLice";
import "./RowItemDetailEvents.scss";

const RowItemDetailEvent = ({ value }) => {
  const dispatch = useDispatch();
  function setCartStake() {
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
      className={`rowItem-container ${
        value.isActive ? "activeDetail" : "isNotActive"
      }`}
      onClick={setCartStake}
    >
      <div className="name">
        {value.title} {value.stake}
      </div>
      <div className="state">{value.factor}</div>
    </div>
  );
};

export default RowItemDetailEvent;

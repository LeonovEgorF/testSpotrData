import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { clearCart } from "../../store/slice/cartSLice";
import { setStatusStake } from "../../store/slice/selectEventsSlice";
import CartCalc from "../CartCalc/CartCalc";
import CartHeader from "../CartHeader/CartHeader";
import CartSelector from "../CartSelecror/CartSelector";
import CartItem from "../CartItem/CartItem";
import preload from "../../assets/empty_cart.webp";
import "./Cart.scss";

const Cart = () => {
  const dispatch = useDispatch();
  const [slideActive, setSlideActive] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  function handleClearCart() {
    dispatch(clearCart());
    dispatch(setStatusStake({ idStake: "all", statusStake: false }));
  }

  return (
    <>
      {cart.length > 0 ? (
        <div className="container_cart">
          <CartHeader
            cart={cart}
            slideActive={slideActive}
            setSlideActive={setSlideActive}
          />
          <div className="main_cart">
            <div className="listStake">
              {cart.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </div>
            <div className="interactive_interface">
              <CartCalc cart={cart} slideActive={slideActive} />
              <CartSelector />
              <div className="wrapper_btn-cart">
                <button className="place">PLACE BET</button>
                <button className="del" onClick={handleClearCart}>
                  DELETE
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container_preload">
          <p>Click on the odds to start with the bet</p>
          <img src={preload} alt="preload" />
        </div>
      )}
    </>
  );
};

export default Cart;

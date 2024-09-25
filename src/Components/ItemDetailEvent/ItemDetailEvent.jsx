import { useState, useEffect } from "react";
import RowItemDetailEvent from "../RowItemDetailEvent/RowItemDetailEvent";
import arrow from "../../assets/arrow.svg";
import "./ItemDetailEvent.scss";

const ItemDetailEvent = ({ value, title, openState }) => {
  const [openStake, setOpenStake] = useState(true);

  useEffect(() => {
    if (!openState) {
      setOpenStake(false);
      return;
    }
    setOpenStake(true);
  }, [openState]);

  return (
    <div className="container_item-detail">
      <div className="header_item-detail">
        <p>{title}</p>
        <div
          className="wr_img_detail"
          onClick={() => setOpenStake((prev) => !prev)}
        >
          <img
            src={arrow}
            alt="arrow"
            className={!openStake ? "closeStake" : null}
          />
        </div>
      </div>
      <div className="main_item-detail">
        {openStake &&
          Object.entries(value).map(([stake, valueStake]) => (
            <RowItemDetailEvent key={stake} title={stake} value={valueStake} />
          ))}
      </div>
    </div>
  );
};

export default ItemDetailEvent;

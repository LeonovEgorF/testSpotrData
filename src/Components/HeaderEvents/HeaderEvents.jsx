import React from "react";
import { useNavigate } from "react-router-dom";
import dbArrow from "../../assets/dbArrow.svg";
import arrow from "../../assets/arrowblack.svg";
import "./HeaderEvents.scss";

const HeaderEvents = ({
  setOpenAllTour,
  isOpenAllTour,
  selectedEvents,
  resetSelectedEvents,
  setHendleSelectEvents,
}) => {
  const eventsSelectLength = Object.keys(selectedEvents).length;
  const navigate = useNavigate();
  return (
    <div className="header_activeSport">
      <div className="back_btn" onClick={() => navigate(-1)}>
        <img src={arrow} alt="arrow" />
        <span>Back</span>
      </div>
      <div className="wrapper_btn">
        <button
          className="retired"
          onClick={resetSelectedEvents}
          disabled={eventsSelectLength > 0 ? false : true}
        >
          Retired
        </button>
        <button
          className="coupon"
          disabled={eventsSelectLength > 0 ? false : true}
          onClick={setHendleSelectEvents}
        >
          Make Coupon
          {eventsSelectLength > 0 && <span>{eventsSelectLength}</span>}
        </button>
      </div>
      <div
        className="dbArrow"
        onClick={() => {
          setOpenAllTour(!isOpenAllTour);
        }}
      >
        <img
          src={dbArrow}
          alt="arrow"
          className={isOpenAllTour ? "" : "closeAllTour"}
        />
      </div>
    </div>
  );
};

export default HeaderEvents;

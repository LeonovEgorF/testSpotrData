import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./SelectedEvents.scss";
import { useSelector } from "react-redux";
import SelectSortEvents from "../SelectSortEvents/SelectSortEvents";
import { getSortedSelectedEvents } from "../../common/helper";
import arrow from "../../assets/arrowblack.svg";
import "./SelectedEvents.scss";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/slice/cartSLice";
import { clearSelectedEvents } from "../../store/slice/selectEventsSlice";

const SelectedEvents = () => {
  const { selectEvents } = useSelector((state) => state.selectEvents);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.values(selectEvents).length === 0) {
      navigate(-1);
    }
  }, [selectEvents]);

  function clearAll() {
    dispatch({ type: "CLEAR_TOUR" });
    dispatch(clearSelectedEvents());
    dispatch(clearCart());
    navigate("/");
  }

  return (
    <div className="container_selectedEvents">
      <div className="headerSelected_events">
        <div
          className="back"
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={arrow} alt="arrow" />
          <span>Back</span>
        </div>
        <div className="clear" onClick={clearAll}>
          Clear All
        </div>
      </div>
      <div className="header_selectedEvents"></div>
      <div className="container_list">
        {Object.entries(getSortedSelectedEvents(selectEvents)).map(
          ([sport, sportValue]) =>
            Object.entries(sportValue).map(([country, countryValue]) =>
              Object.entries(countryValue).map(([tour, tourValue]) => (
                <SelectSortEvents
                  sport={sport}
                  country={country}
                  tour={tour}
                  eventsData={tourValue}
                  key={uuidv4()}
                />
              ))
            )
        )}
      </div>
    </div>
  );
};

export default SelectedEvents;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  setSelectEvents,
  clearSelectedEvents,
} from "../../store/slice/selectEventsSlice";
import { useSelector, useDispatch } from "react-redux";
import { findObjectByKey } from "../../common/helper";
import { clearCart } from "../../store/slice/cartSLice";
import CountryEvents from "../CounryEvents/CountryEvents";
import HeaderEvents from "../HeaderEvents/HeaderEvents";

import "./ActiveSportEvents.scss";

const ActiveSportEvents = () => {
  const [isOpenAllTour, setOpenAllTour] = useState(true);
  const itemSport = useParams().itemSport.toUpperCase().replace(/-/g, " ");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events } = useSelector((state) => state.grade);
  const { selectEvents } = useSelector((state) => state.selectEvents);
  const { tour } = useSelector((state) => state.selectTour);
  const selectTour = findObjectByKey(tour, itemSport);

  function handleSelectEvent(tournament, checked) {
    dispatch({
      type: "EDIT_STATUS_TOUR",
      payload: {
        itemSport,
        tournament,
        checked,
      },
    });
    dispatch(
      setSelectEvents({
        checked,
        tournament: { ...tournament, isSelscted: checked },
      })
    );
  }

  function setEditStatusGroupEvents(checked, tournaments) {
    Object.values(tournaments).forEach((item) => {
      handleSelectEvent(item, checked);
    });
  }

  function resetSelectedEvents() {
    dispatch(clearSelectedEvents());
    dispatch(clearCart());
    dispatch({ type: "CLEAR_TOUR" });
  }

  function setHendleSelectEvents() {
    if (Object.keys(selectEvents).length === 0) return;
    navigate("/sports/selected-events");
  }
  useEffect(() => {
    if (Object.values(tour).length === 0) {
      if (itemSport) {
        dispatch({
          type: "SET_COUNTRTY_TOUR",
          payload: {
            events,
            nameSports: itemSport,
          },
        });
        return;
      }
      navigate("/");
    }
  }, [tour, navigate]);

  if (!selectTour) {
    return null;
  }

  return (
    <div className="container_activeSport">
      <HeaderEvents
        selectedEvents={selectEvents}
        setOpenAllTour={setOpenAllTour}
        isOpenAllTour={isOpenAllTour}
        resetSelectedEvents={resetSelectedEvents}
        setHendleSelectEvents={setHendleSelectEvents}
      />
      <ul className="listActiveSport">
        {Object.keys(selectTour).map((key, index) => (
          <CountryEvents
            key={key}
            country={key}
            tournament={selectTour[key].tournament}
            isOpenAllTour={isOpenAllTour}
            handleSelectEvent={handleSelectEvent}
            setEditStatusGroupEvents={setEditStatusGroupEvents}
          />
        ))}
      </ul>
    </div>
  );
};

export default ActiveSportEvents;

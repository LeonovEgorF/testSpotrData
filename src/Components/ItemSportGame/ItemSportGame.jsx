import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getEventsBySport } from "../../common/helper";
import "./ItemSportGame.scss";

const ItemSportGame = ({ sport, events }) => {
  const dispatch = useDispatch();
  const activeEvents = getEventsBySport(sport, events);

  const handleSetTour = () => {
    dispatch({
      type: "SET_COUNTRTY_TOUR",
      payload: {
        events,
        nameSports: sport,
      },
    });
  };

  return (
    <>
      <li className="item_sport">
        <NavLink
          to={`/sports/${sport.toLowerCase().replace(/ /g, "-")}`}
          onClick={handleSetTour}
        >
          <div className="container_itemSport">
            <h4 className="itemSport_text">
              {sport
                .toLowerCase()
                .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase())}
            </h4>
            <div className="counterEvents">{activeEvents.length}</div>
          </div>
        </NavLink>
      </li>
    </>
  );
};

export default ItemSportGame;

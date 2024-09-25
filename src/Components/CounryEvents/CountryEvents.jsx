import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import arrow from "../../assets/arrow.svg";
import "./CountryEvents.scss";
import TournamentCard from "../TournamentCard/TournamentCard";

const CountryEvents = ({
  country,
  tournament,
  isOpenAllTour,
  handleSelectEvent,
  setEditStatusGroupEvents,
}) => {
  const [isOpenTournament, setIsOpenTournament] = useState(true);
  const [checkAllValue, setCheckAllValue] = useState(false);
  const id = uuidv4();

  useEffect(() => {
    setIsOpenTournament(isOpenAllTour);
  }, [isOpenAllTour]);
  useEffect(() => {
    let isSelctedStatusAll = [];
    Object.values(tournament).forEach((item) => {
      isSelctedStatusAll.push(item.isSelected);
    });
    if (isSelctedStatusAll.includes(false)) {
      setCheckAllValue(false);
      return;
    }
    if (!isSelctedStatusAll.includes(false)) {
      setCheckAllValue(true);
      return;
    }
  }, [tournament]);

  return (
    <li className="container_list-country">
      <div
        className="title"
        onClick={() => setIsOpenTournament(!isOpenTournament)}
      >
        <div className="func_title">
          <div className="checkbox" onClick={(e) => e.stopPropagation()}>
            <input
              className="custom-checkbox_all"
              id={id}
              type="checkbox"
              checked={checkAllValue}
              value={checkAllValue}
              onChange={(event) => {
                setCheckAllValue(event.target.checked);
                setEditStatusGroupEvents(event.target.checked, tournament);
              }}
            />
            <label className="checkbox-label_all" htmlFor={id}>
              {country}
            </label>
          </div>
        </div>
        <div className="arrow">
          <img
            id="arrow"
            src={arrow}
            alt="arrow"
            className={isOpenTournament ? null : "close"}
          />
        </div>
      </div>
      <div className="tableTournaments">
        {Object.values(tournament).map((item, index) => {
          return (
            <TournamentCard
              item={item}
              key={index}
              handleSelectEvent={handleSelectEvent}
              isOpenTournament={isOpenTournament}
            />
          );
        })}
      </div>
    </li>
  );
};

export default CountryEvents;

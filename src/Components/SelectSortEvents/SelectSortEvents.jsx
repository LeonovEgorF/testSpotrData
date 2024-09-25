import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { setSortedDaysEvents } from "../../common/helper";
import SelectDaysEvents from "../SelectDaysEvents/SelectDaysEvents";
import arrow from "../../assets/arrow.svg";
import "./SelectSortEvents.scss";

const SelectSortEvents = ({ sport, country, tour, eventsData }) => {
  const [openEvents, setOpenEvents] = useState(true);
  const title = `${sport} - ${country} - ${tour}`;
  return (
    <>
      <div
        className="header_sort_events"
        style={{ marginBottom: !openEvents ? "10px" : "0px" }}
      >
        <div
          className="text"
          style={{ borderBottom: !openEvents ? "none" : "3px solid white" }}
        >
          {title}
        </div>
        <div
          className="arrow_hidden"
          onClick={() => setOpenEvents((prev) => !prev)}
        >
          <img
            src={arrow}
            alt="arrow"
            className={openEvents ? "openEvents" : null}
          />
        </div>
      </div>
      <div className="main_sort_events-dates">
        {openEvents &&
          Object.entries(setSortedDaysEvents(eventsData)).map(
            ([key, value]) => (
              <SelectDaysEvents
                numDay={key}
                events={value}
                title={title}
                key={uuidv4()}
              />
            )
          )}
      </div>
    </>
  );
};

export default SelectSortEvents;

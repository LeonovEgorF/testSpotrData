import React from "react";
import Event from "../Event/Event";
import { sortEventsTime } from "../../common/helper";
import "./SelectDaysEvents.scss";

const SelectDaysEvents = ({ events, title }) => {
  return (
    <>
      <div className="header_days_events">
        <span style={{ justifySelf: "flex-start" }}>Time</span>
        <span style={{ justifySelf: "flex-start" }}>Event</span>
        <span>1</span>
        <span>2</span>
        <span>Home</span>
        <span></span>
        <span>Away</span>
        <span>Over</span>
        <span></span>
        <span>Under</span>
        <span>Other</span>
      </div>
      <div className="main_days_events">
        {sortEventsTime(events).map((event, index) => (
          <Event {...event} key={index} title={title} />
        ))}
      </div>
    </>
  );
};

export default SelectDaysEvents;

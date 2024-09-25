import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDateCorrectly } from "../../common/helper";
import { useNavigate, useParams } from "react-router-dom";
import ItemDetailEvent from "../ItemDetailEvent/ItemDetailEvent";
import Spinner from "../Spinner/Spinner";
import dbArrow from "../../assets/dbArrowWhite.svg";
import close from "../../assets/close.svg";

import "./DetailEvent.scss";

const DetailEvent = () => {
  const [openState, setOpenState] = useState(true);
  const [dataEvents, setdataEvents] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { event } = useParams();
  const { selectEvents } = useSelector((state) => state.selectEvents);

  useEffect(() => {
    if (Object.values(selectEvents).length === 0) {
      navigate("/");
      return;
    }
    const { group_markets, data } = Object.entries(selectEvents)
      .map(([key, value]) => value.events)
      .flat()
      .find((item) => item.id === event);
    const title = `${data.sport.name} - ${data.country.name} - ${data.tournament.name}`;
    const namePlayers = data.name.split("-");
    const { hours, minutes, days, month, year } = setDateCorrectly(
      data.time_ts
    );
    setdataEvents({
      title,
      namePlayers,
      stakesSort: group_markets.stakesSort,
      hours,
      minutes,
      days,
      month,
      year,
    });
  }, [selectEvents, navigate]);

  function closeAll() {
    navigate("/");
  }

  if (!dataEvents) {
    return <Spinner />;
  }
  return (
    <>
      <div className="container_detail-event">
        <div className="header_detail">
          <div className="hedar_content-detail">
            <div className="container_count">
              <div className="border-count">
                <div className="title">{dataEvents.title}</div>
                <div className="wrapper_count">
                  <div className="player_first">
                    {dataEvents.namePlayers[0]}
                  </div>
                  <div className="date-game">
                    <h2>
                      {dataEvents.hours}:{dataEvents.minutes}
                    </h2>
                    <p>
                      {dataEvents.days}.{dataEvents.month}.{dataEvents.year}
                    </p>
                  </div>
                  <div className="player_second">
                    {dataEvents.namePlayers[1]}
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-close" onClick={closeAll}>
              <img src={close} alt="close" />
            </div>
          </div>
          <div className="footer_detail">
            <div className="footer_title">All Markets</div>
            <div
              className="coollapse"
              onClick={() => setOpenState((prev) => !prev)}
            >
              {openState ? (
                <span>Collapse all markets</span>
              ) : (
                <span>Open all markets</span>
              )}
              <img
                src={dbArrow}
                alt="arrow"
                className={!openState ? "closeState" : null}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="main">
        {Object.entries(dataEvents.stakesSort).map(
          ([key, value]) =>
            value && (
              <ItemDetailEvent
                key={key}
                value={value}
                title={key}
                openState={openState}
              />
            )
        )}
      </div>
    </>
  );
};

export default DetailEvent;

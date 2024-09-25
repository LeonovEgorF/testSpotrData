import { Link } from "react-router-dom";
import { setDateCorrectly } from "../../common/helper";
import SpanStakes from "../SpanStakes/SpanStakes";
import lock from "../../assets/lock.svg";
import "./Event.scss";

const Event = ({ data, group_markets, title }) => {
  const { emc, name, time_ts } = data;
  const { hours, minutes, days, month } = setDateCorrectly(time_ts);
  const namePlayers = name.split("-");
  const objEventStakes = group_markets.stakesSort;

  function renderStake(stakeType, valueType) {
    return objEventStakes[stakeType] && objEventStakes[stakeType][valueType] ? (
      <SpanStakes value={objEventStakes[stakeType][valueType]} title={title} />
    ) : (
      <div className="wr_img">
        <img src={lock} alt="lock" />
      </div>
    );
  }

  return (
    <Link to={`/sports/selected-events/${data.id}`} className="row_event">
      <p>
        <span>
          {hours}:{minutes}
        </span>
        <br />
        <span>
          {days}.{month}
        </span>
      </p>
      <p>
        <span>{namePlayers[0]}</span>
        <br />
        <span>{namePlayers[1]}</span>
      </p>
      {renderStake("Draw No Bet", "over")}
      {renderStake("Draw No Bet", "under")}
      {renderStake("Asian Handicap", "under")}
      {objEventStakes["Asian Handicap"] ? (
        <div className="wrapper_span">
          <span className="stakeNumbersCustom green">
            {objEventStakes["Asian Handicap"].over.stake > 0
              ? `${objEventStakes["Asian Handicap"].over.stake}:0`
              : `0:${objEventStakes["Asian Handicap"].over.stake.slice(1)}`}
          </span>
        </div>
      ) : (
        <div className="wr_img">
          <img src={lock} alt="lock" />
        </div>
      )}
      {renderStake("Asian Handicap", "over")}
      {renderStake("Over/Under", "over")}
      {objEventStakes["Over/Under"] ? (
        <div className="wrapper_span">
          <span className="stakeNumbersCustom green">
            {objEventStakes["Over/Under"].over.stake}
          </span>
        </div>
      ) : (
        <div className="wr_img">
          <img src={lock} alt="lock" />
        </div>
      )}
      {renderStake("Over/Under", "under")}
      <div className="wrapper_span">
        <span className="stakeNumbersCustom green borderOpacity">+{emc}</span>
      </div>
    </Link>
  );
};
export default Event;

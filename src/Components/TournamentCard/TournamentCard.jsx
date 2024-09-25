import React, { useState, useEffect } from "react";
import "./TournamentCard.scss";

const TournamentCard = ({ item, handleSelectEvent, isOpenTournament }) => {
  const [checkTour, setCheckTour] = useState(false);

  useEffect(() => {
    if (item.isSelected) {
      setCheckTour(true);
    } else {
      setCheckTour(false);
    }
  }, [item]);

  return (
    <>
      {isOpenTournament && (
        <div
          className="tournament_item"
          onClick={() => handleSelectEvent(item, !checkTour)}
        >
          <div className="tournament_check">
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={checkTour}
              onChange={(event) => {
                const { checked } = event.target;
                setCheckTour(checked);
              }}
            />
            <label className="checkbox-label">{item.titleTour}</label>
          </div>
          <p>({item.events.length})</p>
        </div>
      )}
    </>
  );
};

export default React.memo(TournamentCard);

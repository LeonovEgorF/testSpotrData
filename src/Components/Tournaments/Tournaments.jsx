import React from "react";
import { v4 as uuidv4 } from "uuid";

const Tournaments = ({ tournaments }) => {
  return (
    <div>
      {Object.values(tournaments).map((tournament) => (
        <div key={uuidv4()}>{tournament}</div>
      ))}
    </div>
  );
};

export default Tournaments;

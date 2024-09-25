import { v4 as uuidv4 } from "uuid";
import ItemSportGame from "../ItemSportGame/ItemSportGame";
import { useSelector } from "react-redux";
import "./Sports.scss";

const Sports = () => {
  const { sports, events } = useSelector((state) => state.grade);
  return (
    <div className="container_sports">
      <div className="wr_title">
        <h3 className="title">Sport Betting</h3>
      </div>
      <ul className="list_sports">
        {Object.keys(sports).map((item) => (
          <ItemSportGame sport={item} key={uuidv4()} events={events} />
        ))}
      </ul>
    </div>
  );
};

export default Sports;

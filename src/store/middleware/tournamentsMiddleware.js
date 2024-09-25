import {
  setTour,
  editTourStatus,
  clearTourActive,
  clearTour,
} from "../slice/tournamentsSlice";
import { getActiveEventsBySport } from "../../common/helper";

const tournamentsMiddleware = () => {
  return (store) => (next) => (action) => {
    if (action.type === "SET_COUNTRTY_TOUR") {
      const tour = getActiveEventsBySport(
        action.payload.nameSports,
        action.payload.events
      );
      store.dispatch(setTour({ [action.payload.nameSports]: tour }));
    }
    if (action.type === "EDIT_STATUS_TOUR") {
      console.log(action.payload);
      store.dispatch(
        editTourStatus({
          tournament: action.payload.tournament,
          itemSport: action.payload.itemSport,
          checked: action.payload.checked,
        })
      );
    }
    if (action.type === "CLEAR_TOUR_ACTIVE") {
      store.dispatch(clearTourActive());
    }
    if (action.type === "CLEAR_TOUR") {
      store.dispatch(clearTour());
    }
    return next(action);
  };
};

export default tournamentsMiddleware;

import gradeReducer from "./slice/gradeSlice";
import selectedEventsDataReducer from "./slice/selectEventsSlice";
import cartReducer from "./slice/cartSLice";
import tournamentSliceReducer from "./slice/tournamentsSlice";
import { configureStore } from "@reduxjs/toolkit";
import webSocketMiddleware from "./middleware/webSocketMiddleware";
import tournamentsMiddleware from "./middleware/tournamentsMiddleware";

export const store = configureStore({
  reducer: {
    grade: gradeReducer,
    selectTour: tournamentSliceReducer,
    selectEvents: selectedEventsDataReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      tournamentsMiddleware(),
      webSocketMiddleware(
        "wss://srv.kralbet.com/sport/?EIO=3&transport=websocket"
      )
    ),
});

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import {
  ActiveSportEvents,
  HomeEvents,
  Sports,
  Spinner,
  Cart,
  Error,
  SelectedEvents,
  DetailEvent,
} from "../Components";

import "./App.scss";
import Header from "../Components/Header/Header";

function App() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.grade);

  useEffect(() => {
    dispatch({ type: "WEBSOCKET_CONNECT" });
    return () => {
      dispatch({ type: "WEBSOCKET_DISCONNECT" });
    };
  }, [dispatch]);

  if (error) {
    console.error(error);
    return <Error />;
  }

  if (loading !== "idle") {
    return (
      <div className="container-spinner">
        <Spinner />;
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container_app">
        <div className="container_sportsGame">
          <Sports />
        </div>
        <div className="container_events">
          <Routes>
            <Route path="/" element={<HomeEvents />} />
            <Route path="/sports/:itemSport" element={<ActiveSportEvents />} />
            <Route
              path="/sports/selected-events"
              element={<SelectedEvents />}
            />
            <Route
              path="/sports/selected-events/:event"
              element={<DetailEvent />}
            />
          </Routes>
        </div>
        <div className="cart">
          <Cart />
        </div>
      </div>
    </>
  );
}

export default App;

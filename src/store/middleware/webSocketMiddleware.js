// middleware/webSocketMiddleware.js
import {
  setEvents,
  setSports,
  onError,
  resetLoading,
} from "../slice/gradeSlice";
import { createCustomEvnet } from "../../common/helper";

const webSocketMiddleware = (url) => {
  let socket = null;
  const sendMessage =
    '42["subscribe-PreliveEvents",{"market_group":"prelive","locale":"tr_TR"}]';
  const messageCode = sendMessage.match(/^(\d+)/)[0];
  return (store) => (next) => (action) => {
    switch (action.type) {
      case "WEBSOCKET_CONNECT":
        if (socket === null) {
          socket = new WebSocket(url);
          socket.onopen = () => {
            console.log("WebSocket connection opened");
            socket.send(sendMessage);
          };

          socket.onmessage = (event) => {
            try {
              if (event.data.includes(messageCode)) {
                const messageData = JSON.parse(event.data.slice(2))[1];
                if (messageData.translation.countries) {
                  store.dispatch(setSports(messageData.translation.sports));
                  store.dispatch(
                    setEvents(createCustomEvnet(messageData.events))
                  );
                  store.dispatch(resetLoading());
                }
              }
            } catch (error) {
              store.dispatch(onError(error.message));
            }
          };

          socket.onclose = () => {
            console.log("WebSocket connection closed");
            socket = null;
          };

          socket.onerror = (error) => {
            console.error("WebSocket error:", error);
          };
        }
        break;

      case "WEBSOCKET_DISCONNECT":
        if (socket) {
          if (socket.readyState === WebSocket.OPEN) {
            socket.send('42["unsubscribe-PreliveEvents"]');
            socket.close();
          }
        }
        break;

      default:
        return next(action);
    }
  };
};

export default webSocketMiddleware;

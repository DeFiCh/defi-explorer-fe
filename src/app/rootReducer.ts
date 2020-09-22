import { combineReducers } from "@reduxjs/toolkit";
import { i18nReducer } from "react-redux-i18n";
import websocketReducer from "../containers/Websocket/reducer";
import appReducer from "../containers/App/reducer";

export default combineReducers({
  app: appReducer,
  i18n: i18nReducer,
  websocket: websocketReducer,
});

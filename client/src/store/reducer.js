import {combineReducers} from "redux";
import {reducerApp} from "./reducers/reducer-app/reducer-app";

export const NameSpace = {
  APP: `APP`,

};

export default combineReducers({
  [NameSpace.APP]: reducerApp,
});

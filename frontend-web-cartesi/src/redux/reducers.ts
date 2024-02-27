import { combineReducers } from "redux";
import session from "./session/reducers";

const reducers = combineReducers([
    session
]);

export default reducers;
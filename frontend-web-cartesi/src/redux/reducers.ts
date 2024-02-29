import { combineReducers } from "redux";
import session from "./session/reducers";
import user from "./user/reducers";

const reducers = combineReducers({
    session,
    user
});

export default reducers;
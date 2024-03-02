import { combineReducers } from "redux";
import { queue } from "./queue/reducers";
import session from "./session/reducers";
import user from "./user/reducers";

const reducers = combineReducers({
    queue,
    session,
    user
});

export default reducers;
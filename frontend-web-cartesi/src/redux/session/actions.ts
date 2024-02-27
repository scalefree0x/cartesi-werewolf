import { SET_SESSION } from "./reducers";


// What information do we need to set and save to the store?
export const setSession = (payload: any) => ({
    type: SET_SESSION,
    payload: payload
});
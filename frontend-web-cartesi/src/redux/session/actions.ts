import { SET_PLAYERS, SET_SESSION } from "./reducers";

export const setPlayers = (payload: any) => ({
    type: SET_PLAYERS,
    payload: payload
});

export const setSession = (payload: any) => ({
    type: SET_SESSION,
    payload: payload
});
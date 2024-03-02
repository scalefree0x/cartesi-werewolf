import { SET_DAPP_STATE, SET_PLAYERS, SET_SESSION } from "./reducers";

export const setDappState = (payload: any) => ({
    type: SET_DAPP_STATE,
    payload: payload
});

export const setPlayers = (payload: any) => ({
    type: SET_PLAYERS,
    payload: payload
});

export const setSession = (payload: any) => ({
    type: SET_SESSION,
    payload: payload
});
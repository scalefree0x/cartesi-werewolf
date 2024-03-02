import { SET_DAPP_STATE, SET_PLAYERS, SET_SESSION, UPDATE_PLAYER } from "./reducers";
import { Player } from "../../types";

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

export const updatePlayer = (payload: Player) => ({
    type: UPDATE_PLAYER,
    payload: payload
})
import { CLEAR_WALLET, SET_CHARACTER, RESET_USER, SET_WALLET } from "./reducers";

export const setCharacter = (payload?: string ) => ({
    type: SET_CHARACTER,
    payload: payload
});

export const clearWaller = () => ({
    type: CLEAR_WALLET
})

export const resetSession = () => ({
    type: RESET_USER
})

// What information do we need to set and save to the store?
export const setWallet = (payload: any) => ({
    type: SET_WALLET,
    payload: payload
});
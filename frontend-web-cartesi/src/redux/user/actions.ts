import { CLEAR_WALLET, RESET_USER, SET_WALLET } from "./reducers";

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
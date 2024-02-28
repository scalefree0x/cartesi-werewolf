import { RESET_SESSION, SET_WALLET } from "./reducers";


export const resetSession = () => ({
    type: RESET_SESSION
})

// What information do we need to set and save to the store?
export const setSession = (payload: any) => ({
    type: SET_WALLET,
    payload: payload
});
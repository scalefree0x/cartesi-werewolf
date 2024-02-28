import { ReduxAction } from "../../types";

export const SET_WALLET = "SET_WALLET";
export const CLEAR_WALLET = "CLEAR_WALLET";
export const RESET_SESSION = "RESET_SESSION";

const INITIAL_STATE = {
    wallet: {}
}

export default function session(state = INITIAL_STATE, action: ReduxAction) {
    switch (action.type) {
        case SET_WALLET:
            return {
                ...state,
                wallet: action.payload
            }
        case CLEAR_WALLET:
            return {
                ...state,
                wallet: INITIAL_STATE.wallet
            }
        case RESET_SESSION:
            return INITIAL_STATE;
        default:
            return state
    }
}
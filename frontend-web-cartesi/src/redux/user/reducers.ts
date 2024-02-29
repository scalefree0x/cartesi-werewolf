import { ReduxAction } from "../../types";

export const SET_WALLET = "SET_WALLET";
export const CLEAR_WALLET = "CLEAR_WALLET";
export const RESET_USER = "RESET_USER";

const INITIAL_STATE = {
    wallet: {}
}

export default function user(state = INITIAL_STATE, action: ReduxAction) {
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
        case RESET_USER:
            return INITIAL_STATE;
        default:
            return state
    }
}
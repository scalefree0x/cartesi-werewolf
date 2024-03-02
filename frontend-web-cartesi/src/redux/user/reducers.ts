import { ReduxAction } from "../../types";

export const CLEAR_WALLET = "CLEAR_WALLET";
export const SET_CHARACTER = "SET_CHARACTER";
export const SET_WALLET = "SET_WALLET";
export const RESET_USER = "RESET_USER";

const INITIAL_STATE = {
    wallet: {}
}

export default function user(state = INITIAL_STATE, action: ReduxAction) {
    switch (action.type) {
        case CLEAR_WALLET:
            return {
                ...state,
                wallet: INITIAL_STATE.wallet
            }
        case SET_CHARACTER:
            return {
                ...state,
                wallet: {
                    ...state.wallet,
                    character: action.payload,
                }
            }
        case SET_WALLET:
            return {
                ...state,
                wallet: action.payload
            }
        case RESET_USER:
            return INITIAL_STATE;
        default:
            return state
    }
}
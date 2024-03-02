import { ReduxAction } from "../../types"

export const CLEAR_PLAYERS = "CLEAR_PLAYERS"

export const SET_DAPP_STATE = "SET_DAPP_STATE";
export const SET_SESSION = "SET_SESSION";
export const SET_PLAYERS = "SET_PLAYERS";

const INITIAL_STATE = {
    players: [],
    dapp_state: {},
}

const session = (state = INITIAL_STATE, action: ReduxAction) => {
    switch (action.type) {
        // case CLEAR_PLAYERS:
        //     return {
        //         ...state,
        //         players: INITIAL_STATE.players
        //     }
        case SET_DAPP_STATE:
            return {
                ...state,
                dapp_state: action.payload
            };
        case SET_SESSION:
            return action.payload;
        case SET_PLAYERS:
            return {
                ...state,
                players: action.payload
            }
        default:
            return state
    }
}

export default session;
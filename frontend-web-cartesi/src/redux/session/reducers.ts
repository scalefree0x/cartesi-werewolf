import { Player, ReduxAction } from "../../types"

export const CLEAR_PLAYERS = "CLEAR_PLAYERS"

export const SET_DAPP_STATE = "SET_DAPP_STATE";
export const SET_SESSION = "SET_SESSION";
export const SET_PLAYERS = "SET_PLAYERS";
export const UPDATE_PLAYER = "UPDATE_PLAYER";

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
        case UPDATE_PLAYER:
            // get the index of the player to be updated
            const updated_player_index = state.players.findIndex((sp: Player) => sp.public_key === action.payload.public_key)
            // if not found, we change nothing
            if (updated_player_index === -1) return state;
            // when found, slice out the old player and replace with the new one
            else return {
                ...state,
                players: [
                    ...state.players.slice(0, updated_player_index),
                    action.payload, // replace the old player with the new player
                    ...state.players.slice(updated_player_index + 1)
                ]
            }
        default:
            return state
    }
}

export default session;
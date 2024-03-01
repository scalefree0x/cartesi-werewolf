import { ReduxAction } from "../../types"

export const CLEAR_PLAYERS = "CLEAR_PLAYERS"
export const SET_SESSION = "SET_SESSION";
export const SET_PLAYERS = "SET_PLAYERS";

const INITIAL_STATE = {
    // players: [
    //     { public_key: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", role: null },
    //     { public_key: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", role: null },
    //     { public_key: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", role: null },
    //     { public_key: "0x90F79bf6EB2c4f870365E785982E1f101E93b906", role: null },
    //     { public_key: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65", role: null },
    //     { public_key: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc", role: null }
    // ],
}

const session = (state = INITIAL_STATE, action: ReduxAction) => {
    switch (action.type) {
        // case CLEAR_PLAYERS:
        //     return {
        //         ...state,
        //         players: INITIAL_STATE.players
        //     }
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
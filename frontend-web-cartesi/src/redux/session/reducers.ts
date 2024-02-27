import { ReduxAction } from "../../types";

export const SET_SESSION = "SET_SESSION";

const INITIAL_STATE = {

}

export default function session(state = INITIAL_STATE, action: ReduxAction) {
    switch (action.type) {
        default:
            return state
    }
}
import { ReduxAction } from "@/models"

const INITIAL_STATE = {

}

export default function session(state = INITIAL_STATE, action: ReduxAction) {
    switch (action.type) {
        default:
            return state
    }
}
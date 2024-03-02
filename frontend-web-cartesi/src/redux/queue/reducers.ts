import { ReduxAction } from "../../types";

export const PUSH_ACTION = "PUSH_ACTION";
export const POP_ACTION = "POP_ACTION";

const INITIAL_STATE: string[] = []

export const queue = (state=INITIAL_STATE, action: ReduxAction) => {
    switch(action.type) {
        case PUSH_ACTION:

            return [...state, action.payload];
        case POP_ACTION:
            return [...state].slice(0, -1);
        default:
            return state;
    }
} 
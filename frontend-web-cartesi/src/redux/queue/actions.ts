import { PUSH_ACTION, POP_ACTION } from "./reducers";

export const pushToQueue = (payload: string) => ({
    type: PUSH_ACTION,
    payload: payload
})

export const popFromQueue = () => ({
    type: POP_ACTION,
})
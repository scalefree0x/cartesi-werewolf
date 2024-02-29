import React from "react";
import store from "../redux/store";
import { setSession as setSessionAction } from "../redux/actions";

export const setSession = (session: any) => {
    /**
     * Add any additional logic to format the session data before we dispatch the action with the payload to the reducer
     */
    store.dispatch(setSessionAction(session));
}
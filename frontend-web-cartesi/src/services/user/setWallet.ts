import React from "react";
import store from "../../redux/store";
import { setWallet as setWalletAction } from "../../redux/actions";

export const setWallet = (session: any) => {
    /**
     * Add any additional logic to format the session data before we dispatch the action with the payload to the reducer
     */
    store.dispatch(setWalletAction(session));
}
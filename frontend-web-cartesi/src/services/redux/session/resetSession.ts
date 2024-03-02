import store from "../../../redux/store";
import { resetSession as resetWalletAction } from "../../../redux/actions";

export const resetSession = () => {
    store.dispatch(resetWalletAction());
}
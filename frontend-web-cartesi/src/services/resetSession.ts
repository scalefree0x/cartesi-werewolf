import store from "../redux/store";
import { resetSession as resetSessionAction } from "../redux/actions";

export const resetSession = () => {
    store.dispatch(resetSessionAction());
}
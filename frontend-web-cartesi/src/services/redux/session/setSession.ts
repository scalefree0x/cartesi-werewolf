import store from "../../../redux/store";
import { setSession as setSessionAction } from "../../../redux/actions";

export const setSession = (session: any) => {
    store.dispatch(setSessionAction(session));
}
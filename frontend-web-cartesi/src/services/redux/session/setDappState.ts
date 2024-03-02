import store from "../../../redux/store";
import { setDappState as sds } from "../../../redux/actions";

export const setDappState = (state: any) => {
    store.dispatch(sds(state));
}
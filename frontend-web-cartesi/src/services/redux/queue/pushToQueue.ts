import store from "../../../redux/store";
import { pushToQueue as ptq } from "../../../redux/actions";

export const pushToQueue = (payload: string) => store.dispatch(ptq(payload));
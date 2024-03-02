import store from "../../../redux/store";
import { popFromQueue as pfq } from "../../../redux/actions";

export const popFromQueue = () => store.dispatch(pfq());
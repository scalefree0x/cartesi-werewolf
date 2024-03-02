import store from "../../../redux/store";
import { setCharacter as sc } from "../../../redux/actions";

export const setCharacter = (character?: string) => {
    store.dispatch(sc(character));
}
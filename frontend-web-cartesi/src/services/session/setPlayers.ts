import { setPlayers as setPlayersAction } from "../../redux/session/actions";
import store from "../../redux/store";

export const setPlayers = (players: any) => {
    store.dispatch(setPlayersAction(players));
}
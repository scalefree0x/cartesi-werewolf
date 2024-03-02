import store from '../../../redux/store'
import { updatePlayer as up } from '../../../redux/actions'
import { Player } from '../../../types'

export const updatePlayer = (player: Player) => {
    store.dispatch(up(player));
}

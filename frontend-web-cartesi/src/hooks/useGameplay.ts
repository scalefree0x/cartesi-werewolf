import React, { useMemo, useState } from 'react'

export const useGameplay = () => {
    const [day, setDay] = useState(true);
    const [player_turn, setPlayerTurn] = useState(0);
    /**
     * Day/Night cycles offer different options for different player types
     * Everyone can accuse and vote on who to lynch
     * At Night, Special character roles in play, werewolves kill, doctors heal, witch performs action (optional)
     */

  return useMemo(() => ({}), []);
}

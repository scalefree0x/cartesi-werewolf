import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Doctor, Drunk, Peasant, Seer, WereWolf, Witch } from '../models'; import { useSelector } from 'react-redux';
import { setPlayers } from '../services';

type role = Doctor | Drunk | Peasant | Seer | WereWolf | Witch
type player = { public_key: string, role: role };

export const useGameplay = () => {

  const { players } = useSelector((s: any) => s.session);

  const [day, setDay] = useState(0);
  const [cycle, setCycle] = useState<"day" | "night">("day");
  const [game, setGame] = useState<"staging" | "live" | "end">("staging");
  const [player_turn, setPlayerTurn] = useState(0);
  const [special_roles, setSpecialRoles] = useState([Witch, Doctor, Seer, Drunk]);

  const initializeRoles = useCallback(() => {
    // we can initialize the game and assign roles
    /**
     * Assigning roles should always include 
     * 1 WereWolf and 3 Peasants min, the rest are arbitrary
     */
    const randomizeRole = (player: player, i: number) => {
      let role = null;
      if (i < 4 || i >= 8) {
        role = new Peasant(player.public_key, player_turn);
      }
      else if (i === 4) role = new WereWolf(player.public_key, player_turn);
      else if (i > 4 && i < 8) {
        const index = i - 5;
        const _class = special_roles[index];
        role = new _class(player.public_key, player_turn);
      }
      setPlayerTurn(() => i++);
      return role;
    }

    setPlayers(
      // iterate over the players and in a sudo randomized manner assign initialized roles
      players.map((player: player, i: number) => ({
        ...player,
        role: randomizeRole(player, i)
      }))
    )
  }, [players]);

  useEffect(() => {
    if (players.length > 5 && game === "staging") {
      // begin a countdown before the game begins
      let count = 10;
      const intervalId = setInterval(() => {
        console.log(count);
        if (count === 0) {
          clearInterval(intervalId);
          initializeRoles();
          setGame(() => "live");
        }
        count--;
      }, 1000);
    }
  }, [players, game]);

  /**
   * Day/Night cycles offer different options for different player types
   * Everyone can accuse and vote on who to lynch
   * At Night, Special character roles in play, werewolves kill, doctors heal, witch performs action (optional)
   */

  return useMemo(() => ({
    cycle,
    day,
  }), [
    cycle,
    day,
  ]);
}

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Doctor, Drunk, Peasant, Seer, WereWolf, Witch } from '../models'; import { useSelector } from 'react-redux';
import { setPlayers } from '../services';

type role = Doctor | Drunk | Peasant | Seer | WereWolf | Witch
type player = { public_key: string, role: role };

export const useGameplay = () => {

  const { players } = useSelector((s: any) => s.session);

  const [day_no, setDayNo] = useState(0);
  const [cycle, setCycle] = useState<"day" | "night">("day");
  const [game, setGame] = useState<"staging" | "in_progress" | "end">("staging");
  const [player_turn, setPlayerTurn] = useState(0);
  const [special_roles, setSpecialRoles] = useState(["WITCH", "DOCTOR", 'SEER', 'DRUNK']);

  const initializeRoles = useCallback(() => {
    // we can initialize the game and assign roles
    /**
     * Assigning roles should always include 
     * 1 WereWolf and 3 Peasants min, the rest are arbitrary
     */
    const randomizeRole = (player: player, i: number) => {
      let role = null;
      if (i < 4 || i >= 8) {
        role = "PEASANT"; // new Peasant(player.public_key, player_turn);
      }
      else if (i === 4) role = "WEREWOLF"; // new WereWolf(player.public_key, player_turn);
      else if (i > 4 && i < 8) {
        const index = i - 5;
        role = special_roles[index];
        // role =  //new _class(player.public_key, player_turn);
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
    setTimeout(() => {
      if (players.length > 5 && game === "staging") {
        // begin a countdown before the game begins
        let count = 10;
        const intervalId = setInterval(() => {
          console.log(count);
          if (count === 0) {
            clearInterval(intervalId);
            initializeRoles();
            setGame("in_progress");
          }
          count--;
        }, 1000);
      }
    }, 1);
  }, [players, game]);

  /**
   * Day/Night cycles offer different options for different player types
   * Everyone can accuse and vote on who to lynch
   * At Night, Special character roles in play, werewolves kill, doctors heal, witch performs action (optional)
   */

  return useMemo(() => ({
    cycle,
    day_no,
  }), [
    cycle,
    day_no,
  ]);
}

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { inspect, setDappState, setPlayers } from '../services';

import { Player } from '../types';
// import { useRoleInterface } from './useRoleInterface';

export const useGameplay = () => {

  const { wallet } = useSelector((s: any) => s.user);
  const { players, dapp_state } = useSelector((s: any) => s.session);

  const [day_no, setDayNo] = useState(0);
  const [cycle, setCycle] = useState<"day" | "night">("day");
  const [game, setGame] = useState<"staging" | "in_progress" | "end">("staging");
  const [player_turn, setPlayerTurn] = useState(0);
  const [special_roles, setSpecialRoles] = useState(["WITCH", "DOCTOR", 'SEER', 'DRUNK']);

  // const { player } = useRoleInterface();

  // establish a read "stream" for inspections
  useEffect(() => {
    const intervalId = setInterval(() => {
      // constantly obtain and update the redux app state
      inspect({ url: 'http://localhost:8080/inspect', payload: "" }).then(res => {
        setDappState(res);
      })
    }, 5000);

    // if we leave the page calling this hook, clear the interval
    return () => {
      clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    /**
     * Get Player from players list using the wallet address
     * 
     */

    // establish the network
    // establish rsa newkeys
    // establish the public key to join the game!

    // moderator?

    // randomly assign roles
  }, [players]);

  // backend will do this...
  // const initializeRoles = useCallback(() => {
  //   // we can initialize the game and assign roles
  //   /**
  //    * Assigning roles should always include 
  //    * 1 WereWolf and 3 Peasants min, the rest are arbitrary
  //    * not really random
  //    */
  //   const randomizeRole = (player: Player, i: number) => {
  //     let role = null;
  //     if (i < 3 || i >= 8) {
  //       role = "PEASANT"; // new Peasant(player.public_key, player_turn);
  //     }
  //     else if (i === 3) role = "WEREWOLF"; // new WereWolf(player.public_key, player_turn);
  //     else if (i > 3 && i < 7) {
  //       const index = i - 5;
  //       role = special_roles[index];
  //       // role =  //new _class(player.public_key, player_turn);
  //     }
  //     setPlayerTurn(() => i++);
  //     return role;
  //   }

  //   setPlayers(
  //     // iterate over the players and in a sudo randomized manner assign initialized roles
  //     players.map((player: Player, i: number) => ({
  //       ...player,
  //       role: randomizeRole(player, i)
  //     }))
  //   )
  // }, [players]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (players.length > 5 && game === "staging") {
  //       // begin a countdown before the game begins
  //       let count = 10;
  //       const intervalId = setInterval(() => {
  //         console.log(count);
  //         if (count === 0) {
  //           initializeRoles();
  //           setGame(() => "in_progress");
  //           clearInterval(intervalId);
  //         }
  //         count--;
  //       }, 1000);
  //     }
  //   }, 1000);
  // }, [players, game]);

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

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { inspect, setCharacter, setDappState } from '../services';

import { Player } from '../types';

export const useGameplay = () => {

  const { wallet } = useSelector((s: any) => s.user);
  const { dapp_state } = useSelector((s: any) => s.session);
  const queue = useSelector((s: any) => s.queue);

  // establish a read "stream" for inspections
  useEffect(() => {
    const intervalId = setInterval(() => {
      // constantly obtain and update the redux app state
      inspect({ url: 'http://localhost:8080/inspect', payload: "" }).then((_dapp_state: any) => {
        /**
         * Verify redux and anvil concurrency
         */
        const dapp_player_keys = Object.keys(_dapp_state?._players ? _dapp_state._players : {});
        // checks the current player to see if they were not initialized
        /* 
         * if we have 1 more dapp player key more than players 
          and the current user's waller isn't among the players, 
          and we are clear from any queued tasks
          map the newest dapp player key to the player
         */
        if (dapp_player_keys.length && wallet.character === undefined && !Object.keys(queue).length
        ) {
          // add the newest res_players key to the character key of players
          setCharacter(dapp_player_keys.pop());
        }
        setDappState(_dapp_state);
      })
    }, 5000);

    // if we leave the page calling this hook, clear the interval
    return () => {
      clearInterval(intervalId);
    }
  }, [wallet, queue]);


  useEffect(() => {
    /**
     * Get Player from players list using the wallet address
     * 
     */

    // establish the network
    // establish rsa newkeys
    // establish the public key to join the game!
    if (dapp_state.moderator) {
      // const mod = players.find((player: Player) => player.public_key === dapp_state.moderator);
      /**
       * once we have the mod, we need to update the state of redux player with moderator bool
       * 
       * moderator goes first,
       * starts the game
       * 
       */
      // initialize the WereWolf
      // random select between 0 and 5
      // exclude moderator index from random select
      // index the store with the random number that's not moderator and give werewolf: true

    }

    // moderator?

    // randomly assign roles
  }, []);


  //   setPlayers(
  //     // iterate over the players and in a sudo randomized manner assign initialized roles
  //     players.map((player: Player, i: number) => ({
  //       ...player,
  //       role: ???
  //     }))
  //   )
  // }, [players]);

  /**
   * Day/Night cycles offer different options for different player types
   * Everyone can accuse and vote on who to lynch
   * At Night, Special character roles in play, werewolves kill, doctors heal, witch performs action (optional)
   */

  return useMemo(() => ({

  }), [

  ]);
}

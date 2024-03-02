import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { bufferToHex, inspect, post, rsaDecrypt, rsaEncrypt, setCharacter, setDappState } from '../services';

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
        if (dapp_player_keys.length && wallet.character === undefined && !queue.length
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
    const player_address = wallet.character;
    const player_index = Object.keys(dapp_state._players).findIndex((key) => key === player_address);
    /**
     * Get Player from players list using the wallet address
     * 
     */

    // establish the network
    // establish rsa newkeys
    // establish the public key to join the game!
    if (dapp_state.moderator) {
      const list_of_all = Object.keys(dapp_state._players);
      const list_of_others = Object.keys(dapp_state._players);
      const index_of_moderator = list_of_others.indexOf(dapp_state._moderator);
      list_of_others.splice(index_of_moderator, 1);

      const werewolf_index = Math.floor(Math.random() * (list_of_others.length - 0 + 1)) + 0;
      const werewolf_key = list_of_others[werewolf_index];

      const encrypted_roles: any = {};
      for (let i = 0; i < list_of_all.length; i++) {
        const player = list_of_all[i];
        if (player == dapp_state._moderator) {
          continue;
        }
        else if (player === werewolf_key) {
          encrypted_roles[player] = rsaEncrypt("WEREWOLF", werewolf_key);
        }
        else {
          encrypted_roles[player] = rsaEncrypt("VILLAGER", werewolf_key);
        }
      }

      const stringified_encrypted_roles = JSON.stringify(encrypted_roles);
      post(bufferToHex(stringified_encrypted_roles), index_of_moderator);

    } else {
      const encrypted_role = dapp_state._players[player_address].encrypted_role;
      const role = rsaDecrypt(encrypted_role, privateKey)

    }

    // moderator?

    // randomly assign roles
  }, [dapp_state, wallet]);


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

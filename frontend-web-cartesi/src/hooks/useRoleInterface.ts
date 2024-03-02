import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { Player, Role } from '../types';
import { Doctor, Drunk, Peasant, Seer, WereWolf, Witch } from '../models';

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  }

export const useRoleInterface = () => {


    const players = [
        { public_key: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", role: null },
        { public_key: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", role: null },
        { public_key: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", role: null },
        { public_key: "0x90F79bf6EB2c4f870365E785982E1f101E93b906", role: null },
        { public_key: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65", role: null },
        { public_key: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc", role: null }
    ];
    // const { players } = useSelector((s: any) => s.session);
    const { wallet } = useSelector((s: any) => s.user);

    const [player_turn, setPlayerTurn] = useState(0);

    // const initializeRoles = useCallback(() => {
    //     /**
    //      * We have a list of special_roles available
    //      * We have a list of players
    //      * There must always be a werewolf but these special roles are extra
    //      * We must have a minimum of 3 peasants to a game
    //      * minimum of 6 players
    //      */

    //     // const special_roles = ["WITCH", "DOCTOR", 'SEER', 'DRUNK'];
    //     // we can initialize the game and assign roles
    //     /**
    //      * This should be random
    //      */
    //     // const assignRole = (player: Player, i: number) => {

    //     //     let role = "PEASANT";
    //     //     if (i < 3 || i >= 8) {
    //     //         role = "PEASANT"; // new Peasant(player.public_key, player_turn);
    //     //     }
    //     //     else if (i === 3) role = "WEREWOLF"; // new WereWolf(player.public_key, player_turn);
    //     //     else if (i > 3 && i < 7) {
    //     //         const index = i - 5;
    //     //         role = special_roles[index];
    //     //         // role =  //new _class(player.public_key, player_turn);
    //     //     }
    //     //     setPlayerTurn(() => i++);
    //     //     return role;
    //     // }

    //     // setPlayers(
    //     //     // iterate over the players and in a sudo randomized manner assign initialized roles
    //     //     players.map((player: Player, i: number) => ({
    //     //         ...player,
    //     //         role: assignRole(player, i)
    //     //     }))
    //     // )
    // }, [players]);

    // const player = React.useMemo(() => {
    //     const player = players.find((player: any) => player.public_key === wallet.address);
    //     switch (player.role) {
    //         case "DOCTOR":
    //             return new Doctor(player.public_key, player.player_turn);
    //         case "DRUNK":
    //             return new Drunk(player.public_key, player.player_turn);
    //         case "SEER":
    //             return new Seer(player.public_key, player.player_turn);
    //         case "WEREWOLF":
    //             return new WereWolf(player.public_key, player.player_turn);
    //         case "WITCH":
    //             return new Witch(player.public_key, player.player_turn)
    //         default:
    //             return new Peasant(player.public_key, player.player_turn);
    //     }
    // }, [players, wallet]);

    // console.log('player', player);

    // establish a list of commands based on what each object generated has access to.
    // These commands will be buttons that assign each class method available per class
    const commands = React.useMemo(() => {

    }, []);

    return React.useMemo(() => ({
        // player
    }), [
        // player
    ]);
}

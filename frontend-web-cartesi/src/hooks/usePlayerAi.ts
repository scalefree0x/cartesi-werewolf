import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { addNetPlayer, setPlayers } from '../services';

export const usePlayerAi = () => {
    /**
     * Populate in the missing players if prompted
    */

    const { players, dapp_state } = useSelector((s: any) => s.session);

    const [ai_players, setAiPlayers] = useState([
        { public_key: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266".toLowerCase(), role: null },
        { public_key: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8".toLowerCase(), role: null },
        { public_key: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC".toLowerCase(), role: null },
        { public_key: "0x90F79bf6EB2c4f870365E785982E1f101E93b906".toLowerCase(), role: null },
        { public_key: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65".toLowerCase(), role: null },
        { public_key: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc".toLowerCase(), role: null }
    ]);

    const initializeAiPlayers = useCallback(async (n: number) => {
        if (ai_players.length === 0) {
            console.warn('no more stock keys to add!')
            return
        }
        if (n > ai_players.length - 1) n = ai_players.length - 1;
        addNetPlayer(ai_players[n].public_key).then((state) => {
            console.log('addNetPlayer', state);
            setPlayers([
                ...players,
                ai_players[n]
            ])
        });
        // setAiPlayers(() => [...ai_players.slice(1)]);
    }, [ai_players, setAiPlayers]);

    useEffect(() => {
        console.log('ai_players', ai_players);
    }, [ai_players]);

    return useMemo(() => ({
        initializeAiPlayers
    }), [initializeAiPlayers]);
}

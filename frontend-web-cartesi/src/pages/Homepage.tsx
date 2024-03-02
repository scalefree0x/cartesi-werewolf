import React, { useCallback, useMemo } from 'react';
import { useRouter } from '../hooks';
import { useSelector } from 'react-redux';
import { addNetPlayer, inspect, popFromQueue, post, pushToQueue, setPlayers } from '../services';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Homepage = () => {

    const { location, navigate, params } = useRouter();

    const { wallet } = useSelector((s: any) => s.user);
    // const { dapp_state } = useSelector((s: any) => s.session);

    const validUser = useMemo(() => Boolean(wallet?.address), [wallet]);
    // const player_keys = useMemo(() => Object.keys(dapp_state?._players ? dapp_state._players : {}), [dapp_state]);

    // persist pervious players
    const joinGame = useCallback(() => {
        inspect({ url: 'http://localhost:8080/inspect', payload: "" }).then(dapp_state => {
            console.log('NEW_CHARACTER dapp_state', dapp_state);
            const player_keys = Object.keys(dapp_state?._players ? dapp_state._players : {});
            navigate('/werewolf');
            pushToQueue("addNetPlayer");
            addNetPlayer(player_keys.length).then(() => {
                popFromQueue();
            })
        })
    }, []);

    /**
     * We may want to have the Wallet connection keep the user on just this page.
     * Once connected, the user will be routed to a lobby with other players or maybe even AI
     * 
     * 
     * If we can incoporate more routes and persist wallet connectivity across the site. 
     * We can create separate pages, such as a game lobby, and separate game instances
     */
    return (
        <div className='w-full'>
            <ToastContainer />
            <div className='flex justify-center'>
                <p>
                    Welcome to Cartesi Werewolf!
                </p>
                <br />
                TODO Homepage What would we want on the homepage?<br />
                Home Screen:<br />
                Welcome message, game description, role selection.<br />
                <br />
                Option to view game progress (past rounds, player stats).<br />
                Connect wallet button using Ethereum libraries like Web3.js or WalletConnect.<br />
                Display current wallet address and balance.<br />
            </div>
            {validUser ? (
                <button className='btn btn-outline btn-primary rounded-lg w-full' onClick={joinGame}>Go To Game</button>
            ) : (
                <></>
            )}
        </div>
    )
}

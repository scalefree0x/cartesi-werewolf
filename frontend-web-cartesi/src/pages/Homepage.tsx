import React, { useMemo } from 'react';
import { useRouter } from '../hooks';
import { useSelector } from 'react-redux';

export const Homepage = () => {
    
    const { location, navigate, params } = useRouter();
    const {wallet} = useSelector((s: any) => s.session);

    const validWallet = useMemo(() => {
        return Boolean(wallet?.address);
    }, [wallet])
    
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
            <div className='flex justify-center'>
                <p>
                    Welcome to Cartesi Werewolf!
                </p>
                <br />
                <p>

                </p>
                TODO Homepage What would we want on the homepage?<br />
                Home Screen:<br />
                Welcome message, game description, role selection.<br />
                <br />
                Option to view game progress (past rounds, player stats).<br />
                Connect wallet button using Ethereum libraries like Web3.js or WalletConnect.<br />
                Display current wallet address and balance.<br />
            </div>
            {validWallet ? (
                <button className='btn btn-outline btn-primary rounded-lg w-full' onClick={() => {
                    navigate('/werewolf');
                }}>Go To Game</button>
            ) : (
                <></>
            )}
        </div>
    )
}

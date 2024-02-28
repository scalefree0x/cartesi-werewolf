import React from 'react';
import { useRouter } from '../hooks';

export const Homepage = () => {
    const { location, navigate, params } = useRouter();
    return (
        <div className='w-full h-screen'>
            <div className='flex justify-center'>
                TODO Homepage What would we want on the homepage?<br />
                Home Screen:<br />
                Welcome message, game description, role selection.<br />
                <br />
                Option to view game progress (past rounds, player stats).<br />
                Connect wallet button using Ethereum libraries like Web3.js or WalletConnect.<br />
                Display current wallet address and balance.<br />
            </div>
        </div>
    )
}

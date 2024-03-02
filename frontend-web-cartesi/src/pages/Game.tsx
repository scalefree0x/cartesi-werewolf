import React from 'react'
import { useGameplay } from '../hooks';
import { Board, ChatBox } from '../components';

export const Game = () => {

    const {  } = useGameplay();

    return (
        <div className='w-full'>
            <div className='flex justify-center' style={{height: '80vh'}}>
                <Board />
            </div>
            <div>
                <ChatBox />
            </div>
        </div>
    )
}

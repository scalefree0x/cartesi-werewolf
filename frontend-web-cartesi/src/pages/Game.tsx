import React from 'react'
import { useGameplay } from '../hooks';
import { Board, ChatBox } from '../components';

export const Game = () => {

    const { cycle, day_no } = useGameplay();

    return (
        <div className='w-full'>
            <div className='flex justify-center'>
                <Board />
            </div>
            <div>
                <ChatBox />
            </div>
        </div>
    )
}

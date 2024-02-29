import React from 'react'
import { Board, ChatBox } from '../components';

export const Game = () => {

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

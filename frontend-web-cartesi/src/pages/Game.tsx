import React from 'react'
import { Board, ChatBox } from '../components';

export const Game = () => {
    const players = [
        {
            name: "Alpha",
            role: "Peasant",
            status: "Alive"
        },
        {
            name: "Beta",
            role: "Peasant",
            status: "Alive"
        },
        {
            name: "Charlie",
            role: "Witch",
            status: "Alive"
        },
        {
            name: "Dog",
            role: "Seer",
            status: "Alive"
        },
        {
            name: "Echo",
            role: "Doctor",
            status: "Alive"
        },
        {
            name: "Foxtrot",
            role: "Werewolf",
            status: "Alive"
        },
    ]

    return (
        <div className='w-full'>
            <div className='flex justify-center'>
                <Board players={players} />
            </div>
            <div>
                <ChatBox />
            </div>
        </div>
    )
}

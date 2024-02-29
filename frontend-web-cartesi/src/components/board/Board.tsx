import React from 'react'
import { useSelector } from 'react-redux'
import { useGameplay } from '../../hooks';

export const Board = () => {
  
  const { players } = useSelector((s: any) => s.session);

  // const {} = useGameplay();

  return (
    <div className='grid w-full'>
      {players.map((player: any, i: number) => (
        <div key={i}>
          {player.public_key}
        </div>
      ))}
    </div>
  )
}

import React from 'react'

export const Board = ({ players }: { players: any[] }) => {
  return (
    <div className='grid w-full'>
      {players.map((player: any, i: number) => (
        <div key={i}>
          {player.name} / {player.status}
        </div>
      ))}
    </div>
  )
}

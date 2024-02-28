import React from 'react'

export const Board = ({ players }: { players: any[] }) => {
  return (
    <div className='grid w-full'>
      {players.map((player: any) => (
        <div>
          {player.name} / {player.status}
        </div>
      ))}
    </div>
  )
}

import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'

export const Board = () => {

  const { players } = useSelector((s: any) => s.session);
  const { wallet } = useSelector((s: any) => s.user);

  const you = useCallback((player: any) => {
    if (wallet.address === player.public_key) return player.role;
    else return <></>
  }, [wallet]);

  return (
    <div className='grid w-full'>
      {players.map((player: any, i: number) => (
        <div key={i}>
          {player.public_key} {you(player)}
        </div>
      ))}
    </div>
  )
}

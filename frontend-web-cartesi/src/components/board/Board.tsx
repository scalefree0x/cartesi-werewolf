import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { truncatePublicKey } from './assets';
import { ToastContainer } from 'react-toastify';

const image_card = {
  height: '10rem',
  width: '10rem',
  zIndex: '1'
}

export const Board = () => {

  const { players, dapp_state } = useSelector((s: any) => s.session);
  const { wallet } = useSelector((s: any) => s.user);

  const you = useCallback((player: any) => {
    if (wallet.address === player.public_key && player.role) return <>*<img style={image_card} src={`${player?.role?.toLowerCase()}.png`} alt="image" /></>;
    else return <img style={image_card} src="villager.png" alt="image" />
  }, [wallet]);

  const playerCount = useMemo(() => players.length, [players]);

  const calculateGridPlacement = (index: number) => {
    const gridPositions: any = {
      1: 'top',
      2: 'top-middle',
      3: 'bottom-middle',
      4: 'bottom',
      5: 'top-middle',
      6: 'top-middle',
      7: 'bottom',
      8: 'bottom',
      9: 'bottom-middle',
      10: 'top-middle',
      11: 'top-middle',
      12: 'top-middle'
    };
    return gridPositions[index] || '';
  };

  // Calculate grid rows and columns based on player count
  const calculateGridSize = useCallback(() => {
    if (playerCount <= 4) {
      return `grid-rows-2 grid-cols-2`;
    } else if (playerCount <= 8) {
      return `grid-rows-3 grid-cols-3`;
    } else if (playerCount <= 12) {
      return `grid-rows-4 grid-cols-3`;
    } else {
      return `grid-rows-4 grid-cols-3`;
    }
  }, [playerCount]);

  // Generate indices array
  const indices = useMemo(() => {
    let indices = [];
    for (let i = 0; i < playerCount; i++) {
      indices.push({
        position: i,
        player: players[i]
      });
    }
    return indices;
  }, [playerCount]);

  return (
    <div className='grid w-full h-full'>
      <ToastContainer />
      <div className={`grid justify-center ${calculateGridSize()} gap-4`}>
        {indices.map((slot) => (
          <div
            key={slot.position}
            className={`p-4 border border-gray-300 rounded-md ${calculateGridPlacement(slot.position + 1)
              }`}
          >
            {slot.position + 1} {truncatePublicKey(slot.player.public_key)} {you(slot.player)}
          </div>
        ))}
      </div>
    </div>
  )
}

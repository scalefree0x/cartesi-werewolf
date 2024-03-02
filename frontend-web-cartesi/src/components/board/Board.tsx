import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { truncatePublicKey } from './assets';
import { ToastContainer } from 'react-toastify';
import { usePlayerAi } from '../../hooks/usePlayerAi';

const image_card = {
  height: '10rem',
  width: '10rem',
  zIndex: '1'
}

export const Board = () => {

  const { dapp_state } = useSelector((s: any) => s.session);
  const { wallet } = useSelector((s: any) => s.user);
  const [ai_player_input, setAiPlayerInput] = React.useState(0);
  const { initializeAiPlayers } = usePlayerAi();

  const you = useCallback((player: any) => {
    if (wallet.character === player && player.role) return <>(You)<img style={image_card} src={`${player?.role?.toLowerCase()}.png`} alt="image" /></>;
    else if (wallet.character === player && !player.role) return <>(You)<img style={image_card} src="villager.png" alt="image" /></>
    else return <img style={image_card} src="villager.png" alt="image" />
  }, [wallet]);

  const playerKeys = useMemo(() => Object.keys(dapp_state?._players ? dapp_state._players : {}), [dapp_state]);
  const playerCount = useMemo(() => playerKeys.length, [playerKeys]);

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
        player: playerKeys[i]
      });
    }
    console.log('indicies', indices);
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
            {slot.position + 1} {truncatePublicKey(slot.player)} {you(slot.player)}
          </div>
        ))}
      </div>
      <div className='flex'>
        <input onChange={(e: any) => setAiPlayerInput(e.target.value)} className='w-40 input input-secondary' type='number' />
        <button className='btn btn-secondary btn-outline rounded-lg w-40' onClick={() => initializeAiPlayers(ai_player_input)}>Add AI</button>
      </div>
    </div>
  )
}

import React from 'react'
import { Network } from '../Network'

export const TopBar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a onClick={() => window.location.replace('/')} className="btn btn-ghost text-xl">Cartesi Werewolf</a>
            </div>
            <div className="flex-none">
                <ul className="px-1">
                    <li><Network /></li>
                </ul>
            </div>
        </div>
    )
}

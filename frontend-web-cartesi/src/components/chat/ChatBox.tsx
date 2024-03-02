import React, { useCallback, useState } from 'react'
import { Chat } from './Chat';

export const ChatBox = () => {
    /**
     * We will want to enable websockets to connect different people to have real time interaction
     * We can also allow voting via the chat perhaps?
     */
    const [display, setDisplay] = useState("Chat");

    const [minimize, setMinimize] = useState(false);

    const click = useCallback((value: "Chat" | "Vote") => {
        // If the user clicks Vote or Chat, then we will bring up the chat again.
        if (minimize) setMinimize(() => true);
        setDisplay(() => value);
    }, [setDisplay]);

    const toggleChat = useCallback(() => setMinimize(() => !minimize), [setMinimize, minimize]);

    return (
        <div className={`absolute bottom-0 right-0 w-4/12 ${minimize ? 'h-16' : 'h-60'} border rounded-md z-10`}>
            <div className="navbar bg-base-100 border rounded-md">
                <div className="flex-1">
                    <button onClick={toggleChat} className="btn btn-ghost text-xl cursor-pointer">{display}</button>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><a onClick={() => click('Chat')} className={`${display === 'Chat' ? 'active' : ''}`}>Chat</a></li>
                        <li><a onClick={() => click('Vote')} className={`${display === 'Vote' ? 'active' : ''}`}>Vote</a></li>
                    </ul>
                </div>
            </div>
            {!minimize ? <Chat /> : <></>}
        </div>
    )
}

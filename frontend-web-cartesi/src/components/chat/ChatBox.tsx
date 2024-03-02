import React, { useCallback, useRef, useEffect, useState } from 'react';
import WebSocketComponent from './../WebSocketComponent'; // Adjust the path as needed
import { Chat } from './Chat';

export const ChatBox = () => {
    /**
     * We will want to enable websockets to connect different people to have real time interaction
     * We can also allow voting via the chat perhaps?
     */
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [display, setDisplay] = useState("Chat");
    const [minimize, setMinimize] = useState(false);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const click = useCallback((value: "Chat" | "Vote") => {
        // If the user clicks Vote or Chat, then we will bring up the chat again.
        if (minimize) setMinimize(() => true);
        setDisplay(() => value);
    }, [setDisplay]);
    
    const toggleChat = useCallback(() => setMinimize(() => !minimize), [setMinimize, minimize]);
    // const sendMessage = WebSocketComponent(); // Initialize WebSocketComponent

    const handleMessageReceived = useCallback((newMessage: any) => {
        setMessages(prevMessages => prevMessages.concat(newMessage));
        scrollToBottom();
        console.log("Messages",messages);
    }, []);

    const sendMessage = WebSocketComponent(handleMessageReceived);

    // Function to handle sending messages
    const handleSendMessage = useCallback(() => {
        if (message.trim() !== '') {
            sendMessage(message);
            setMessage('');
        }
    }, [message, sendMessage]);

    // Function to handle input field change
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }, []);

    // Function to handle input field change
    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    }, [handleSendMessage]);

    const styles = {
        container: {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: '999',
        },
        chatBox: {
            maxHeight: '200px',
            height: '200px',
            width: '280px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px',
        },
        message: {
            marginBottom: '5px',
        },
        inputContainer: {
            display: 'flex',
            marginBottom: '10px',
        },
        input: {
            flex: '1',
            marginRight: '10px',
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ccc',
        },
        button: {
            padding: '5px 10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
        },
        toggleButton: {
            padding: '5px 10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
        },
    };
    
    return (
        <div style={styles.container as React.CSSProperties}>
        <div style={styles.chatBox  as React.CSSProperties} ref={messagesContainerRef}>
            {messages.map((msg, index) => (
                <div key={index} style={styles.message}>{msg}</div>
            ))}
        </div>
        <div style={styles.inputContainer}>
            <input 
                type="text" 
                placeholder="Type your message..." 
                value={message} 
                onChange={handleChange} 
                onKeyPress={handleKeyPress} 
                style={styles.input}
            />
            <button onClick={handleSendMessage} style={styles.button}>Send</button>
        </div>
    </div>
    );
};
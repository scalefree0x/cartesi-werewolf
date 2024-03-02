import React, { useEffect, useState } from 'react';

const WebSocketComponent = (onMessageReceived) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // WebSocket URL
        const newSocket = new WebSocket('ws://localhost:9001');

        // Additional data to send
        const data = {
            name: 'John',
            favoriteColor: 'blue'
        };

        // Event listener when WebSocket connection is open
        newSocket.onopen = () => {
            // Send additional data after connection is established
            console.log("WebSocket Opened")
        };

        // Event listener when WebSocket receives a message
        newSocket.onmessage = (event) => {
            console.log('Received message:', event.data);
            // Parase message data.
            console.log(event.data.split("|"));
            var messageData = event.data.split("|");
            var clientId = messageData[0];
            var clientMessage = messageData[1];
            // Call the callback function with the received message
            onMessageReceived(event.data);
            // Handle incoming messages from the WebSocket server
        };

        // Event listener when WebSocket connection encounters an error
        newSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Event listener when WebSocket connection is closed
        newSocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // Save the socket in state
        setSocket(newSocket);

        // Clean-up function to close WebSocket connection when component unmounts
        return () => {
            newSocket.close();
        };
    }, []); // Empty dependency array ensures this effect runs only once

    // Function to send a message to the WebSocket server
    const sendMessage = (message) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(message);
            console.log('Sent message:', message);
        } else {
            console.error('WebSocket connection not established.');
        }
    };

    // Expose the sendMessage function to the parent component
    return sendMessage;
};

export default WebSocketComponent;

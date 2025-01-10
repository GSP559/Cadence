import React, { useState } from 'react';
import './styles.css';

const Chatbox = ({ messages, onSendMessage, currentUser }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage({ chatMessage: message, sentBy: currentUser, to: currentUser === "Joshua" ? "Simon" : "Joshua" }); // Adjust "to" as needed based on your application's logic
        setMessage('');
    };

    return (
        <div className="chatbox">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sentBy === currentUser ? 'user-message' : 'other-message'}`}>
                        {msg.chatMessage}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="send-message-form">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chatbox;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.css";

const SignUpComponent = ({ onClose, text }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const stopPropagation = (e) => e.stopPropagation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isSignup = text === "Sign Up";

        if (username === '' || password === '' || (isSignup && email === '')) {
            alert('Please fill in all required fields.');
            return;
        }

        const url = isSignup ? '/signup' : '/login';
        const body = isSignup ? { username, password, email } : { username, password };

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            if (url === '/signup') {
                const data = await res.json();
                navigate('/onboarding');
                console.log(data);
            } else {
                const data = await res.json();
                navigate('/dashboard'); 
                console.log(data);
            }
            // Navigate based on the action
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="modal-background" onClick={onClose}>
            <div className="modal-container" onClick={stopPropagation}>
                <div className="modal-header">
                    <button type="button" className="close-button" onClick={onClose}>×</button>
                </div>
                <div className="modal-content">
                    <h2>{text}</h2>
                    <div className="input-container">
                        <input type="text" id="username" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    {text === "Sign Up" && (
                        <div className="input-container">
                            <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    )}
                    <div className="input-container">
                        <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="submit-button">{text}</button>
                </div>
            </div>
        </form>
    );
};

export default SignUpComponent;

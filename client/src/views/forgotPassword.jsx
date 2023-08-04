import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/forgotPassword', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error processing request');
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleForgotPassword}>
                <input type='email' name='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} required />
                <input type='submit' value='Submit' />
            </form>
            <p>{message}</p>
        </div>
    );
};

export default ForgotPassword;

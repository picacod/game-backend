import React, { useState, useEffect } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function VerifyOtp() {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate(); 
    // Retrieve user_id from local storage when the component mounts
    useEffect(() => {
        const storedUserId = localStorage.getItem('user_id');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            setError('User ID not found.');
        }
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            setError('User ID is missing.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/api/verify_otp/', { user_id: userId, otp });
            setMessage(response.data.message);
            setError('');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred.');
            setMessage('');
        }
    };
    


     return (
        <div style={{ backgroundColor: 'black', width: '100%', minHeight: '100vh', maxHeight: 'fit-content' }} className='d-flex align-items-center justify-content-center'>
            <div style={{ backgroundColor: 'black' }} className='card shadow p-5 rounded-0'>
                <h3 className='mb-3 text-secondary'>Verify OTP</h3>
                <form onSubmit={handleSubmit}>
                    <FloatingLabel controlId="floatingOtp" label="OTP" className="rounded-0 mb-3">
                        <Form.Control
                            type="text"
                            placeholder="OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            style={{ width: '450px' }}
                            required
                        />
                    </FloatingLabel>
                    <Button
                        type="submit"
                        style={{ width: '100px', backgroundColor: '#171717', color: 'white' }}
                        className='py-2 rounded-0'
                    >
                        Verify
                    </Button>
                </form>
                {message && <p className="text-success mt-3">{message}</p>}
                {error && <p className="text-danger mt-3">{error}</p>}
            </div>
        </div>
    );
}

export default VerifyOtp;
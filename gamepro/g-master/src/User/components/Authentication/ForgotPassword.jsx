import React, { useState } from 'react'
import { Form, FloatingLabel } from 'react-bootstrap'
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/password-reset/', { email });
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred.');
            setMessage('');
        }
    };
  
      return (
        <div style={{ backgroundColor: 'black', width: '100%', minHeight: '100vh', maxHeight: 'fit-content' }} className='d-flex align-items-center justify-content-center'>
            <div style={{ backgroundColor: 'black' }} className='card shadow p-5 rounded-0'>
                <h3 className='mb-3 text-secondary'>Forgot Password?</h3>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel controlId="floatingInput" label="Email" className="rounded-0 mb-3">
                        <Form.Control
                            style={{ width: '450px' }}
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </FloatingLabel>
                    <button type="submit" style={{ width: '100px', backgroundColor: '#171717', color: 'white' }} className='btn py-2 rounded-0'>Send</button>
                </Form>
                {message && <p className='mt-3 text-success'>{message}</p>}
                {error && <p className='mt-3 text-danger'>{error}</p>}
            </div>
        </div>
    );
}

export default ForgotPassword;
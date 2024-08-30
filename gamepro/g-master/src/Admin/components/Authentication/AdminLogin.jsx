import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';


function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const response = await axios.post('http://localhost:8000/api/admin_login/', {
                username,
                password
            });
            setMessage('Login successful');
            
            // Store tokens and admin ID in localStorage or sessionStorage
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            sessionStorage.setItem('user_id', response.data.user_id);
            
            // Redirect or handle successful login
            window.location.href = '/admin/overview';  // Example redirect
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.detail);
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };


    return (
        <div style={{
            backgroundImage: 'url("https://c.wallhere.com/photos/3d/26/1680x1050_px_action_Dark_fantasy_fi_Fighting_sci_war-1610933.jpg!d")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '100vh',
            position: 'relative',
        }}>
            {/* Dark Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adjust the opacity as needed
                zIndex: 1,
            }}></div>

            <div className="d-flex justify-content-center align-items-center h-100" style={{ position: 'relative', zIndex: 2 }}>
                <div className="text-white p-4" style={{
                    width: '30rem', borderRadius: '1rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust opacity as needed
                    backdropFilter: 'blur(10px)', // Adjust blur intensity as needed
                }}>
                    <h6 className='mb-4 text-light text-center rounded d-flex align-items-center justify-content-center'>
                        <p className='m-0 fs-3 fw-bold text-secondary'>Login</p>
                        <i className="fa-brands fs-1 fa-keycdn text-secondary ms-2"></i>
                    </h6>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4" controlId="formBasicUsername">
                            <Form.Control
                                type="text"
                                placeholder="Enter Your Name"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                placeholder="Enter Your Password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {message && <div className="alert alert-success">{message}</div>}
                        <div className="d-flex justify-content-start">
                            <Button variant="outline-light" size="lg" type="submit">Login</Button>
                        </div>
                        {/* <p className='mt-3'>Not a member? <Link to={'/register'}>Create new account</Link></p> */}
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;

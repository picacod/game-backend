import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import styles from '../../styles/ResetPassword.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import axios from 'axios'; 


const PasswordField = ({ label, placeholder, showPassword, onTogglePassword, value, onChange }) => {
    return (
        <FloatingLabel controlId={`floatingPassword-${label}`} label={label} className={`${styles.passwordField} mb-3`}>
            <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{ borderRadius: '0px' }}
                required
            />
            <Button
                variant="link"
                onClick={onTogglePassword}
                className={styles.passwordToggleButton}
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
            </Button>
        </FloatingLabel>
    );
};



function ResetPassword() {
    const { uid, token } = useParams(); // Get the uid and token from the URL
    const navigate = useNavigate();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            setMessage('');
            return;
        }
    
        try {
            // Debugging: Check payload before sending
            console.log({
                uid,
                token,
                new_password: newPassword,
            });
    
            const response = await axios.post('http://localhost:8000/api/password-reset-confirm/', {
                uid,
                token,
                new_password: newPassword,
            });
            
            setMessage(response.data.message);
            setError('');
            navigate('/login');
        } catch (err) {
            // Debugging: Check error response
            console.error('Error response:', err.response);
            setError(err.response?.data?.error || 'An error occurred.');
            setMessage('');
        }
    };
    

    return (
        <div style={{ backgroundColor: 'black' }} className="vh-100 d-flex align-items-center justify-content-center">
            <div className="col-12 col-md-4 container">
                <h3 className='mb-4'>Reset Password</h3>
                <form onSubmit={handleSubmit}>
                    <PasswordField
                        label="New Password"
                        placeholder="New Password"
                        showPassword={showNewPassword}
                        onTogglePassword={() => setShowNewPassword(!showNewPassword)}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <PasswordField
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        showPassword={showOldPassword}
                        onTogglePassword={() => setShowOldPassword(!showOldPassword)}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        style={{ backgroundColor: '#171717', color: 'white' }}
                        type="submit"
                        size="lg"
                        className="me-auto btn px-4 rounded-0"
                    >
                        Reset
                    </button>
                </form>
                {message && <p className="text-success mt-3">{message}</p>}
                {error && <p className="text-danger mt-3">{error}</p>}
            </div>
        </div>
    );
}

export default ResetPassword;

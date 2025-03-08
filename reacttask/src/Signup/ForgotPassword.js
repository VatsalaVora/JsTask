import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = (e) => {
        e.preventDefault();

        let users = JSON.parse(localStorage.getItem("userData")) || [];
        let userIndex = users.findIndex(user => user.email === email);

        if (userIndex === -1) {
            alert("Email not found! Please sign up.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        users[userIndex].password = newPassword; 
        localStorage.setItem("userData", JSON.stringify(users)); 

        alert("Password reset successfully! You can now login.");
        navigate("/login"); 
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <h2>Reset Password</h2>
                <form onSubmit={handleResetPassword}>
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Enter new password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm new password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    /><br />
                    <button type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;

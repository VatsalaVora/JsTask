import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangePassword.css';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    // Fetch logged-in user
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        alert("No user is logged in! Please log in first.");
        navigate("/login");
        return null;
    }

    const handleChangePassword = (e) => {
        e.preventDefault();

        // Fetch users from localStorage
        let users = JSON.parse(localStorage.getItem("userData")) || [];
        let userIndex = users.findIndex(user => user.email === loggedInUser.email);

        if (users[userIndex].password !== oldPassword) {
            alert("Old password is incorrect!");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("New passwords do not match!");
            return;
        }

        // Update password
        users[userIndex].password = newPassword;
        localStorage.setItem("userData", JSON.stringify(users));

        // Also update logged-in user details
        loggedInUser.password = newPassword;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        alert("Password changed successfully! Please log in again.");
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="change-password-container">
            <div className="change-password-box">
                <h2>Change Password</h2>
                <form onSubmit={handleChangePassword}>
                    <input 
                        type="password" 
                        placeholder="Enter old password" 
                        value={oldPassword} 
                        onChange={(e) => setOldPassword(e.target.value)} 
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
                    /><br/>
                    <button type="submit">Change Password</button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;

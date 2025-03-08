import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
    const navigate = useNavigate();

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    useEffect(() => {
        if (!loggedInUser) {
            alert("No user is logged in! Please log in first.");
            navigate("/login");
        }
    }, [loggedInUser, navigate]);

    const [userData, setUserData] = useState(loggedInUser || { name: '', email: '', address: '' });
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        let users = JSON.parse(localStorage.getItem("userData")) || [];
        let userIndex = users.findIndex(user => user.email === loggedInUser.email);
        users[userIndex] = userData;
        localStorage.setItem("userData", JSON.stringify(users));
        localStorage.setItem("loggedInUser", JSON.stringify(userData));

        setIsEditing(false);
        alert("Profile updated successfully!");
    };

    return (
        <div className="profile-container">
            <div className="profile-box">
                <h2>My Profile</h2>

                <div className="profile-info">
                    <label>Name:</label>
                    {isEditing ? (
                        <input type="text" name="name" value={userData.name} onChange={handleChange} required />
                    ) : (
                        <p>{userData.name}</p>
                    )}

                    <label>Email:</label>
                    <p>{userData.email}</p>

                    <label>Address:</label>
                    {isEditing ? (
                        <input type="text" name="address" value={userData.address} onChange={handleChange} required />
                    ) : (
                        <p>{userData.address}</p>
                    )}
                </div>

                {isEditing ? (
                    <button className="save-btn" onClick={handleSave}>Save</button>
                ) : (
                    <button className="edit-btn" onClick={handleEdit}>Edit</button>
                )}
            </div>
        </div>
    );
}

export default Profile;

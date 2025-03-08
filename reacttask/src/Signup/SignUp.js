import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './SignUp.css';

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        password: '',
        confPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confPassword) {
            alert("Passwords do not match");
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem("userData")) || [];
        const isUserExists = existingUsers.some(user => user.email === formData.email);
        if (isUserExists) {
            alert("User already exists! Please log in.");
            return;
        }
        const updatedUsers = Array.isArray(existingUsers) ? [...existingUsers, formData] : [formData];
        
        localStorage.setItem("userData", JSON.stringify(updatedUsers));
        alert("Signup Successful!");
        setFormData({ name: '', email: '', address: '', password: '', confPassword: '' });
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <input type="password" name="confPassword" placeholder="Confirm Password" value={formData.confPassword} onChange={handleChange} required />
                    <button type="submit">Sign Up</button>
                </form>
                <p className="login-link">Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

export default SignUp;

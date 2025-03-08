import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const existingUsers = JSON.parse(localStorage.getItem("userData")) || [];
        const user = existingUsers.find(u => u.email === formData.email && u.password === formData.password);

        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));  
            alert("Login successful!");
            navigate("/phome"); 
        } else {
            alert("Invalid email or password!");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <button type="submit">Login</button>
                </form>
                 <p className="login-link">Don't have an account? <Link to="/signup">SignUp</Link></p>
                 <p className="forgot-password"><Link to="/forgot-password">Forgot Password?</Link></p>
            </div>
        </div>
    );
}

export default Login;

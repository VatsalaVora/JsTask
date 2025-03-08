import React, { useEffect, useState } from 'react';

function Home() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Retrieve the logged-in user from localStorage
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

        // Check if a user is logged in and set the name
        if (loggedInUser) {
            setUserName(loggedInUser.name);
        }
    }, []);

    return (
        <div>
            <h2>Welcome to your Dashboard, {userName}!</h2>
        </div>
    );
}

export default Home;

import React from 'react';
function UserHooks() {
    const [user, setUser] = React.useState({ name: "Rohit", age: 37, gender: "Male", runs: 11049 })
    return (<>
        Name : {user.name}<br />
        Age : {user.age}<br />
        Gender : {user.gender}<br />
        ODI Runs : {user.runs}<br />
        <input type='button' value='Update' onClick={() => setUser({ ...user, runs: 12000 })} />
    </>);
}

export default UserHooks;
import React, { useState, useEffect } from 'react';

function AddData() {
    const [formData, setFormData] = useState({ name: '', gender: '', email: '', mobile: '', password: '' });
    const [records, setRecords] = useState([]);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        const storedRecords = JSON.parse(localStorage.getItem('users')) || [];
        setRecords(storedRecords);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedRecords = [...records];
        if (editing !== null) {
            updatedRecords[editing] = formData;
            setEditing(null);
        } else {
            updatedRecords.push(formData);
        }
        setRecords(updatedRecords);
        localStorage.setItem('users', JSON.stringify(updatedRecords));
        setFormData({ name: '', gender: '', email: '', mobile: '', password: '' });
    };

    const handleEdit = (index) => {
        setFormData(records[index]);
        setEditing(index);
    };

    const handleDelete = (index) => {
        const updatedRecords = records.filter((_, i) => i !== index);
        setRecords(updatedRecords);
        localStorage.setItem('users', JSON.stringify(updatedRecords));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Stored Data</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => (
                        <tr key={index}>
                            <td>{record.name}</td>
                            <td>{record.gender}</td>
                            <td>{record.email}</td>
                            <td>{record.mobile}</td>
                            <td>
                                <button onClick={() => handleEdit(index)}>Edit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                Name: <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <div>
                  Gender:  <label>
                        <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female
                    </label>
                </div><br/>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br/>
                <input type="text" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} required /><br/>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required /><br/>
                <button type="submit">{editing !== null ? 'Update' : 'Add'}</button>
            </form>
        </div>
    );
}

export default AddData;

import React, { useState } from 'react';

function ToDoFunction() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState('');

    const handleChange = (event) => setNewTask(event.target.value);

    const addTask = () => {
        if (newTask.trim()) {
            setTasks(prevTasks => [...prevTasks, newTask]);
            setNewTask('');
        }
    };

    const deleteTask = (index) => {
        setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
    };

    const editTask = (index) => {
        setEditingIndex(index);
        setEditingText(tasks[index]);
    };

    const handleEditChange = (event) => setEditingText(event.target.value);

    const saveTask = (index) => {
        setTasks(prevTasks => prevTasks.map((task, i, arr) => (i === index ? editingText : task)));
        setEditingIndex(null);
        setEditingText('');
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h2>To-Do List</h2>
            <div>
                <input 
                    type="text" 
                    value={newTask} 
                    onChange={handleChange} 
                    placeholder="Add a new task" 
                />
                <button onClick={addTask}>Add</button>
            </div>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {tasks.map((task, index, array) => (
                    <li key={index} style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                        {editingIndex === index ? (
                            <>
                                <input 
                                    type="text" 
                                    value={editingText} 
                                    onChange={handleEditChange} 
                                />
                                <button onClick={() => saveTask(index)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{task}</span>
                                <button onClick={() => editTask(index)}>Edit</button>
                                <button onClick={() => deleteTask(index)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoFunction;

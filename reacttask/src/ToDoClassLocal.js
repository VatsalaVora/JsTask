import React, { Component } from 'react';

class ToDoClassLocal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: localStorage.getItem('todoClassTasks') ? JSON.parse(localStorage.getItem('todoClassTasks')) : [],
            newTask: '',
            editingIndex: null
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.tasks !== this.state.tasks) {
            localStorage.setItem('todoClassTasks', this.state.tasks);
        }
    }

    handleChange = (event) => this.setState({ newTask: event.target.value });

    addTask = () => {
        if (this.state.newTask) {
            this.setState(({ tasks, newTask }) => ({
                tasks: [...tasks, newTask],
                newTask: ''
            }));
        }
    };

    updateTask = (index, newValue) => {
        this.setState(({ tasks }) => {
            const updatedTasks = [...tasks];
            updatedTasks[index] = newValue;
            return { tasks: updatedTasks, editingIndex: null };
        });
    };

    deleteTask = (index) => {
        this.setState(({ tasks }) => ({
            tasks: tasks.filter((_, i) => i !== index)
        }));
    };

    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <h2>To-Do List</h2>
                <div>
                    <input 
                        type="text" 
                        value={this.state.newTask} 
                        onChange={this.handleChange} 
                        placeholder="Add a new task" 
                    />
                    <button onClick={this.addTask}>Add</button>
                </div>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {this.state.tasks.map((task, index) => (
                        <li key={index} style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                            {this.state.editingIndex === index ? (
                                <>
                                    <input 
                                        type="text" 
                                        defaultValue={task} 
                                        onBlur={(e) => this.updateTask(index, e.target.value)}
                                    />
                                    <button onClick={() => this.updateTask(index, task)}>Save</button>
                                </>
                            ) : (
                                <>
                                    <span>{task}</span>
                                    <button onClick={() => this.setState({ editingIndex: index })}>Edit</button>
                                    <button onClick={() => this.deleteTask(index)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ToDoClassLocal;
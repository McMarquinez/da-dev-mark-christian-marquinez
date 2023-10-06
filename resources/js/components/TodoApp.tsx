import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        // Fetch tasks from the API
        fetch('/api/tasks')
            .then((response) => response.json())
            .then(({data}) => {
                setTasks(data)
            })
            .catch((error) => console.error('Error fetching tasks:', error));
    }, []);

    const addTask = () => {
        if (!newTask.trim()) return;

        // Send a POST request to create a new task
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task: newTask }),
        })
            .then((response) => response.json())
            .then(({data}) => {
                setTasks([...tasks, data]);
                setNewTask('');
            })
            .catch((error) => console.error('Error adding task:', error));
    };

    return (
        <div>
            <h1>Todo App</h1>
            <input
                type="text"
                placeholder="Add a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={addTask}>Add</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{task.task}</li>
                ))}
            </ul>
        </div>
    );
}

const container = document.getElementById('todo-app');
const root = createRoot(container);
root.render(<TodoApp />);

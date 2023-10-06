import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '../../css/todo_style.css';

function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        // Fetch tasks from the API
        fetch('/api/tasks')
            .then((response) => response.json())
            .then(({ data }) => {
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
            .then(({ data }) => {
                setTasks([...tasks, data]);
                setNewTask('');
            })
            .catch((error) => console.error('Error adding task:', error));
    };

    const deleteTask = (taskId) => {
        // Send a DELETE request to remove a task
        fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setTasks(tasks.filter((task) => task.id !== taskId));
            })
            .catch((error) => console.error('Error deleting task:', error));
    };

    const markAsDone = (taskId) => {
        // Send a PATCH request to mark a task as done
        fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'done' }),
        })
            .then(() => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === taskId ? { ...task, status: 'done' } : task
                    )
                );
            })
            .catch((error) => console.error('Error marking task as done:', error));
    };

    return (
        <div className="max-w-md mx-auto mt-4 p-4 bg-white rounded shadow-lg">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Todo App</h1>
            <div className="flex mb-2">
                <input
                    type="text"
                    className="flex-grow py-2 px-4 border rounded-l"
                    placeholder="Add a new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button
                    onClick={addTask}
                    className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-r hover:bg-blue-600"
                >
                    Add
                </button>
            </div>
            <ul className="mt-4 space-y-2">
                {tasks.map((task) => (
                    <li key={task.id} className={`flex justify-between items-center py-2 px-4 border-b last:border-b-0 ${task.status === 'done' ? 'line-through' : ''}`}>
                        <span>{task.task}</span>
                        <div className="space-x-2">
                            {task.status !== 'done' && (
                                <button onClick={() => markAsDone(task.id)} className="text-green-500">Done</button>
                            )}
                            <button onClick={() => deleteTask(task.id)} className={`text-red-500`}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const container = document.getElementById('todo-app');
const root = createRoot(container);
root.render(<TodoApp />);

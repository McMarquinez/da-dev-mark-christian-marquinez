import React from 'react';
import ReactDOM from 'react-dom/client';

export default function TodoApp() {
    return (
        <h1>Helllllooooooowwww</h1>
    )
}

const container = document.getElementById('todo-app');
const root = ReactDOM.createRoot(container);
root.render(<TodoApp/>)
import React, { useState } from 'react';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const addTodo = () => {
        if (inputValue.trim() === '') {
            setError('Завдання не може бути порожнім');
            return;
        }
        setTodos([...todos, inputValue]);
        setInputValue('');
        setError('');
    };

    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    return (
        <div>
            <h1>TODO</h1>
            <input
                type="text"
                placeholder="Введіть завдання"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={addTodo}>Додати</button>
            {error && <p>{error}</p>}
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo}
                        <button onClick={() => deleteTodo(index)}>Видалити</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;

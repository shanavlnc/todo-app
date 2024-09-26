import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, isComplete: false, isEditing: false }]);
      setInputValue('');
    }
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleComplete = (index) => {
    const newTodos = todos.map((todo, i) => (
      i === index ? { ...todo, isComplete: !todo.isComplete } : todo
    ));
    setTodos(newTodos);
  };

  const editTodo = (index) => {
    const newTodos = todos.map((todo, i) => (
      i === index ? { ...todo, isEditing: true } : todo
    ));
    setTodos(newTodos);
  };

  const saveTodo = (index, newText) => {
    const newTodos = todos.map((todo, i) => (
      i === index ? { ...todo, text: newText, isEditing: false } : todo
    ));
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add</button>
      {todos.length === 0 ? (
        <p>No todos available. Add a todo to get started!</p>
      ) : (
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className={`todo-item ${todo.isComplete ? 'completed' : ''}`}>
              {todo.isEditing ? (
                <>
                  <input
                    type="text"
                    defaultValue={todo.text}
                    onBlur={(e) => saveTodo(index, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        saveTodo(index, e.target.value);
                      }
                    }}
                  />
                  <button onClick={() => saveTodo(index, todo.text)}>Save</button>
                </>
              ) : (
                <>
                  <span>{todo.text}</span>
                  <button onClick={() => toggleComplete(index)} disabled={todo.isEditing}>
                    {todo.isComplete ? 'Undo' : 'Complete'}
                  </button>
                  <button onClick={() => editTodo(index)} disabled={todo.isComplete}>Edit</button>
                  <button onClick={() => removeTodo(index)} disabled={todo.isComplete}>Remove</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

function TodoItem({ todo, index, onComplete, onEdit, onSave, onRemove }) {
  const [editText, setEditText] = useState(todo.text);
  const [fadeIn, setFadeIn] = useState(true);

  // for fade in 
  useEffect(() => {
    setFadeIn(true);
    const timer = setTimeout(() => setFadeIn(false), 500); 
    return () => clearTimeout(timer); 
  }, [todo]);

  return (
    <li className={`todo-item ${fadeIn ? 'fade-in' : ''} ${todo.isComplete ? 'completed' : ''}`}>
      {todo.isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={() => onSave(index, editText)}>Save</button>
        </>
      ) : (
        <>
          <span>{todo.text}</span>
          <button
            onClick={() => onComplete(index)}
            disabled={todo.isEditing || todo.isComplete}
          >
            {todo.isComplete ? 'Undo' : 'Complete'}
          </button>
          <button
            onClick={() => onEdit(index)}
            disabled={todo.isEditing || todo.isComplete}
          >
            Edit
          </button>
          <button
            onClick={() => onRemove(index)}
            disabled={todo.isEditing || todo.isComplete}
          >
            Remove
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;

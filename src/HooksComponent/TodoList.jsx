import React, { useState, useEffect } from 'react';
import './TodoList.css'

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('createdAt');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== '') {
      const newTodoItem = { id: Date.now(), text: newTodo, completed: false };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const handleEdit = (id) => {
    setEditing(id);
  };

  const handleSave = (id, text) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditing(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete todo item ${id}?`);
    if (confirmDelete) {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
  });

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sort === 'createdAt') return a.id - b.id;
    if (sort === 'completed') return a.completed - b.completed;
  });

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          placeholder="Add new todo"
        />
        <button type="submit">Add</button>
      </form>
      <div className="filters">
        <label>
          Filter:
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </label>
        <label>
          Sort:
          <select value={sort} onChange={handleSortChange}>
            <option value="createdAt">Creation Date</option>
            <option value="completed">Completed Status</option>
          </select>
        </label>
      </div>
      <ul>
        {sortedTodos.map((todo) => (
          <li key={todo.id}>
            {editing === todo.id ? (
              <input
                type="text"
                value={todo.text}
                onChange={(event) => handleSave(todo.id, event.target.value)}
              />
            ) : (
              <span>{todo.text}</span>
            )}
            <button type="button" className="edit" onClick={() => handleEdit(todo.id)}>Edit</button>
            <button type="button" className="delete" onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
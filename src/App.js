// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  // Define the fetchTodos function
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    // Fetch todos from the server when the component mounts
    fetchTodos();
  }, []); // Add an empty dependency array

  const handleAddTodo = async () => {
    console.log('Adding todo...');
    try {
      // Make a POST request to create a new todo
      await axios.post('http://localhost:5000/api/todos', { task });
      // Fetch updated todos after adding a new one
      fetchTodos();
      // Clear the input field
      setTask('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleUpdateTodo = async (id) => {
    try {
      // Make a PUT request to update the completion status of a todo
      await axios.put(`http://localhost:5000/api/todos/${id}`, { completed: true });
      // Fetch updated todos after marking one as completed
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      // Make a DELETE request to remove a todo
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      // Fetch updated todos after deleting one
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="App">
      <h1>MERN Todo App</h1>
      <div>
        <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.task} - {todo.completed ? 'Completed' : 'Incomplete'}
            {!todo.completed && (
              <>
                <button onClick={() => handleUpdateTodo(todo._id)}>Mark as Completed</button>
                <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

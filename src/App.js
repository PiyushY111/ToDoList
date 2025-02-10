import React, { useState, useEffect } from "react";
import './App.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="App"> {/* Removed dark mode class */}
      <header className="App-header">
        <div className="header-container">
          <header>
            <h1>ToDoList</h1>
          </header>
          <div className="input-container">
            <input 
              type="text" 
              value={newTask} 
              onChange={(e) => setNewTask(e.target.value)} 
              placeholder="Add a new task"
              className="task-input"
            />
            <button onClick={addTask} className="add-button">Add</button>
          </div>
        </div>
        
        <div className="task-columns">
          <div className="column">
            <h2>All Tasks</h2>
            <ul className="task-list">
              {tasks.map(task => (
                <li key={task.id} className="task-card">
                  <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className={task.completed ? "completed" : ""}>
                    {task.text}
                  </span>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="column">
            <h2>Pending Tasks</h2>
            <ul className="task-list">
              {tasks.filter(task => !task.completed).map(task => (
                <li key={task.id} className="task-card">
                  <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className={task.completed ? "completed" : ""}>
                    {task.text}
                  </span>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="column">
            <h2>Completed Tasks</h2>
            <ul className="task-list">
              {tasks.filter(task => task.completed).map(task => (
                <li key={task.id} className="task-card">
                  <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className={task.completed ? "completed" : ""}>
                    {task.text}
                  </span>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default TodoApp;

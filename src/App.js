import './App.css';
import React,  { useState, useRef, useEffect } from 'react';
import TodoList from './components/TodoList';
// import uuidv5 from 'uuid/v5'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {

const [todos, setTodos] = useState([])
const toDoNameRef = useRef()

useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if (storedTodos) setTodos(storedTodos)
}, []);

useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}, [todos]);

function toggleTodo(id){
  const newTodos = [...todos]
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)
}

function handleAddToDo(e){
  const name = toDoNameRef.current.value
  if ( name === '') return
  setTodos(prevTodos =>{
    return [...prevTodos, {id:uuidv4(), name: name, complete: false}]
  })
  toDoNameRef.current.value = null
}

function handleClearTodos(){
  const newTodos = todos.filter(todos => !todos.complete)
  setTodos(newTodos)
}

  return (
    <div className="App">
      <div className="Container">
        <h1>To-Do List</h1>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <br></br>
        <input ref={toDoNameRef}type="text" class="text-center"></input>
        <p class="text-center"><strong>{todos.filter(todo => !todo.complete).length} left to do</strong></p>

        </div>

        <button onClick={handleAddToDo}>Add To-Do</button>
        
        <button onClick={handleClearTodos}>Clear To-Do</button>
    </div>
  );
}

export default App;

// Learned from: https://www.youtube.com/watch?v=hQAHSlTtcmY
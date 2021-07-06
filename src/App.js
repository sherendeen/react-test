import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import {v4 as uuidv4} from 'uuid';

function App() {
  //{id: 1, name: 'Todo 1', complete: false}
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  const LOCAL_STORAGE_KEY = 'todoApp.todos'

  useEffect(()=>{
    const storedTodos = JSON.parse( localStorage.getItem
    (LOCAL_STORAGE_KEY) );
    if (storedTodos) setTodos(storedTodos);

  }, [])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo =>todo.id === id);
    // let todo = null;
    
    // for (let i = 0; i < newTodos.length; i++) {
    //   if(newTodos[i].id === id ) {
    //     todo = newTodos[i];
    //   }
    // }

    todo.complete = !todo.complete;
    setTodos(newTodos);


  }


  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === '') return;
    
    // setTodos(prevTodos => {
    //   return [...prevTodos, {id: (Math.random() * 999) + 1, name: name, complete: false}]
    // })

    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })

    //clear field
    todoNameRef.current.value = null;

  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;

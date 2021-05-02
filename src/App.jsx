import React, {useState, Fragment, useRef, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import {Header} from './components/Header';
import {TodoList} from './components/TodoList';
import './App.css';


export default function App() {
    const [todos, setTodos] = useState([]); //{"id": 1, "task": "task1", "completed":false}
    const todoTaskRef = useRef();
    const KEY = 'todos';

    useEffect(()=>{
       const storedTodos = JSON.parse(localStorage.getItem(KEY));
       if(storedTodos){
           setTodos(storedTodos);
       }
    },[])

    useEffect(()=>{
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos])

    const handleTodoAdd = () =>{
        const task = todoTaskRef.current.value;
        if(task === "") return;
        setTodos((prevTodos)=>{
            return [...prevTodos, {id: uuidv4(), task, completed: false}];
        });
        todoTaskRef.current.value = '';
    }

    const toggleTodo = (id) =>{
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos((newTodos));
    }

    const handleClearAll = () =>{
        const newTodos = todos.filter((todo)=> !todo.completed);
        setTodos((newTodos));
    }

    return (
        <Fragment>
            <Header />
            <div className="container">
                <div className="inputs">
                  <input type="text" ref={todoTaskRef} placeholder="Ingresa una nueva tarea" autoFocus />
                  <button onClick={handleTodoAdd} >&#10010;</button> 
                  <button onClick={handleClearAll}>&#128465;</button> 
                </div>
                <p className="incomplete">Te quedan {todos.filter((todo)=> !todo.completed).length} por terminar.</p>
                <TodoList todos={todos} toggleTodo={toggleTodo} />
            </div>
            
        </Fragment>
    )
}

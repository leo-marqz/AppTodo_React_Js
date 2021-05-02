import React from 'react';
import './css/TodoList.css';
import {TodoItem} from './TodoItem';

export function TodoList({todos, toggleTodo}) {
    return (
        <ul>
            {todos.map((todo)=>(
                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
            ))}
        </ul>
    )
}

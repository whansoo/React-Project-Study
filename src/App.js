import React, { useRef, useState} from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from './components/TodoInsert';
import TodoList from "./components/TodoList";



const App = () => {
  const [todos, setTodos] = useState([
    { id:1, text: '오늘의 할 일 목록 만들기', checked: true },
  ])
 
  const nextId = useRef(2);
 const onInsert = text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1; 
    };

  const onRemove = id => {
      setTodos(todos.filter(todo => todo.id !== id));
    };

  const onToggle = id => {
      setTodos(
        todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    };
   
    return (
      <TodoTemplate>
         <TodoInsert onInsert={onInsert}  />
         <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
      </TodoTemplate>
    )
  };


export default App;

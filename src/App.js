import React, { useRef, useState, useEffect, useCallback} from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoList from "./components/TodoList";
import TodoInsert from './components/TodoInsert';
import ToDoEdit from "./components/ToDoEdit";

const App = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false); //플래그 역할을 해줄 state
  const [todos, setTodos] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("todoKey");
      if (saved !== null) {
        return JSON.parse(saved);
      } else {
        return [
          { id:1, text: '오늘의 할 일 목록 만들기', checked: true },
        ];
      }
    }
  });
   
    
  useEffect(() => {
    window.localStorage.setItem("todoKey", JSON.stringify(todos));
  }, [todos]);

  
  useEffect(() => {
    const data = localStorage.getItem('todoKey');
    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);
  //ref를 사용하여 변수를 담는다.
  const nextId = useRef(2);
 const onInsert = useCallback(text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos=>todos.concat(todo));
      nextId.current += 1; 
    },[]);

  const onRemove = useCallback(id => {
      setTodos(todos=>todos.filter(todo => todo.id !== id));
    },[]);



  const onToggle = useCallback(id => {
      setTodos(todos =>
        todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },[]);
    const onInsertToggle = () => {
      if (selectedTodo) {
        setSelectedTodo(null);
      }
      setInsertToggle((prev) => !prev);
    };
    const onChangeSelectedTodo = (todo) => {
      setSelectedTodo(todo);
    }; 

    const onUpdate = (id, text) => {
      onInsertToggle();
      
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
    };

    return (
      <TodoTemplate>
        {insertToggle && (<ToDoEdit onUpdate={onUpdate} selectedTodo={selectedTodo}/>)}
        <TodoInsert onInsert={onInsert} todos={todos}  />
         <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} onChangeSelectedTodo={onChangeSelectedTodo} onInsertToggle={onInsertToggle}/>
      </TodoTemplate>
    )
  };


export default App;

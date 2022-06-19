import React from "react";
import {
  MdOutlineFavoriteBorder,
   MdOutlineFavorite,
    MdDelete,
    MdModeEditOutline,
  } from 'react-icons/md';
import cn from "classnames";
import './TodoListItem.scss';




const TodoListItem = ({todo, onRemove,  onToggle, onChangeSelectedTodo, onInsertToggle}) => {
   const {id, text, checked} = todo;

  

    return (
        <div className="TodoListItem">
          <div className={cn('checkbox', {checked})} onClick={() => onToggle(id)}>
           {checked ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />} 
           <div className="text">{text}</div>
           </div>
           <div className="edit" onClick={() => {onChangeSelectedTodo(todo) 
            onInsertToggle(); }}>
        <MdModeEditOutline /></div>
        <div className="remove" onClick={() => onRemove(id)}>
        <MdDelete />
       </div>
    </div>
    );
};

export default TodoListItem;
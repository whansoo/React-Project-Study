import React from 'react';
import { useState } from 'react';

const ToDoSearch = () => {
    const { toDoList, search } = useState;
    return (
        <div>
        <input value={search} name="search" onChange={this.handleSearch} placeholder=" ..검색" />
        
          data={toDoList.filter((data) => data.text.indexOf(search) !== -1)}
        </div>
    );
};

export default ToDoSearch;
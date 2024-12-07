import React from "react";

import TodoListItems from "./todo-list-items";

const TodoList = ({ todos }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <TodoListItems {...itemProps} />
      </li>
    );
  });
  return <ul className="list-group">{elements}</ul>;
};

export default TodoList;

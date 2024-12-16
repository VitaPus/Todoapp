import React from "react";
import PropTypes from "prop-types";
import Task from "../Task/task";

import "./task-list.css";

const TaskList = ({ todos, onDeleted, onToggleDone, onToggleEdited }) => {
  const elements = todos.map((el) => {
    const { id, vision, ...itemProps } = el;
    let className = "description";
    if (vision === false) className += " none";

    return (
      <li key={id} className={className}>
        <Task
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          onToggleEdited={() => onToggleEdited(id)}
        />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

TaskList.defaultProps = {
  todos: [],
  onToggleDone: () => {},
  onToggleEdited: () => {},
  onDeleted: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.array,
  onToggleDone: PropTypes.func,
  onToggleEdited: PropTypes.func,
  onDeleted: PropTypes.func,
};

export default TaskList;

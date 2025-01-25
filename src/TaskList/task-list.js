import React from 'react'
import PropTypes from 'prop-types'
import Task from '../Task/task'
import './task-list.css'

const TaskList = ({ todos, onDeleted, onToggleDone, onToggleEdited }) => {
  const elements = todos.map((el) => {
    const { id, time, ...itemProps } = el // Получите время из элемента
    let className = 'description'
    if (el.vision === false) className += ' none'

    return (
      <li key={id} className={className}>
        <Task
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          onToggleEdited={() => onToggleEdited(id)}
          time={time}
        />
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  todos: [],
  onToggleDone: () => {},
  onToggleEdited: () => {},
  onDeleted: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.array,
  onToggleDone: PropTypes.func,
  onToggleEdited: PropTypes.func,
  onDeleted: PropTypes.func,
}

export default TaskList

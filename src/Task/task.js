import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import Timer from '../Timer'
import './task.css'

const Task = ({
  done,
  label: initialLabel,
  edited,
  created,
  onDeleted,
  onToggleDone,
  onToggleEdited,
  onUpdateTask,
  id,
}) => {
  const [label, setLabel] = useState(initialLabel)

  const onChange = (e) => {
    setLabel(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    onUpdateTask(id, label)
    onToggleEdited(id)
  }

  const timeAgo = formatDistanceToNow(created, {
    includeSeconds: true,
    addSuffix: true,
  })

  let classNames = 'description'
  if (done) {
    classNames += ' completed'
  }

  return edited ? (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={label}
        className="new-todo"
        placeholder="Что нужно сделать?"
        autoFocus
        onChange={onChange}
      />
    </form>
  ) : (
    <div className="view">
      <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
      <label>
        <span className={classNames}>{label}</span>
        <span className="created">{timeAgo}</span>
        <Timer />
        <button className="icon icon-edit" onClick={onToggleEdited}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </label>
    </div>
  )
}

Task.defaultProps = {
  done: false,
  label: '',
  edited: false,
  onToggleDone: () => {},
  onToggleEdited: () => {},
  onDeleted: () => {},
  onUpdateTask: () => {},
  created: Date.now(),
}

Task.propTypes = {
  done: PropTypes.bool,
  label: PropTypes.string,
  edited: PropTypes.bool,
  onToggleDone: PropTypes.func,
  onToggleEdited: PropTypes.func,
  onDeleted: PropTypes.func,
  onUpdateTask: PropTypes.func,
  created: PropTypes.number,
}

export default Task

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

const NewTaskForm = ({ addTask }) => {
  const [label, setLabel] = useState('')

  const onTaskChange = (e) => {
    setLabel(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    addTask(label)
    setLabel('')
  }

  return (
    <header className="header">
      <h1>Todos</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={label}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={onTaskChange}
        />
      </form>
    </header>
  )
}

NewTaskForm.defaultProps = {
  addTask: () => {},
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
}

export default NewTaskForm

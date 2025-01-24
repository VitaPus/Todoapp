import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    time: '00:00', // Исправлено здесь
  };

  onTaskChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onTimeChange = (e) => { // Добавлен метод для изменения времени
    this.setState({
      time: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label, time } = this.state; // Исправлено здесь
    this.props.addTask(label, time);
    this.setState({
      label: '',
      time: '00:00',
    });
  };

  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.label}
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onTaskChange}
          />
           <input
            type="time"
            min="00:01"
            value={this.state.time}
            className="addTime"
            placeholder="hh:mm"
            onChange={this.onTimeChange}/>
            <button className="time_button" type="submit"/>
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired, // Добавлен пропс addTask
};
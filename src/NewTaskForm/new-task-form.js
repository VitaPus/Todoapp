import React, { Component } from "react";

import "./new-task-form.css";

export default class NewTaskForm extends Component {
  state = {
    label: "",
  };
  onTaskChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTask(this.state.label);
    this.setState({
      label: "",
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
        </form>
      </header>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './task.css';
import Timer from '../Timer/timer';

export default class Task extends Component {
  state = {
    label: this.props.label,
    currentTime: this.props.time, // Храним текущее время таймера
  };

  onChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onUpdateTask(this.props.id, this.state.label);
    this.props.onToggleEdited(this.props.id);
  };

  updateTime = (newTime) => {
    this.setState({ currentTime: newTime });
  };

  render() {
    const { done, onDeleted, onToggleDone, onToggleEdited, edited, created } = this.props;
    const timeAgo = formatDistanceToNow(created, {
      includeSeconds: true,
      addSuffix: true,
    });

    let classNames = 'description';
    if (done) {
      classNames += ' completed';
    }

    return edited ? (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          value={this.state.label}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onChange}
        />
      </form>
    ) : (
      <div className="view">
        <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
        <label>
          <span className={classNames}>{this.state.label}</span>
          <span className="created">{timeAgo}</span>
          <Timer
            initialTime={this.state.currentTime}
            isRunning={!done && !edited}
            onTimeUpdate={this.updateTime} // Передаем callback для обновления времени
          />
          <button className="icon icon-edit" onClick={onToggleEdited}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </label>
      </div>
    );
  }
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
};

Task.propTypes = {
  done: PropTypes.bool,
  label: PropTypes.string,
  edited: PropTypes.bool,
  onToggleDone: PropTypes.func,
  onToggleEdited: PropTypes.func,
  onDeleted: PropTypes.func,
  onUpdateTask: PropTypes.func,
  created: PropTypes.number,
};

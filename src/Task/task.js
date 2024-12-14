import React, { Component } from "react";

import "./task.css";

export default class Task extends Component {
  state = {
    done: false,
  };

  render() {
    const { label, onDeleted, onToggleDone, done } = this.props;

    let classNames = "description";
    if (done) {
      classNames += " completed";
    }
    return (
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleDone} />
        <label>
          <span className={classNames}> {label} </span>
          <span className="created">created 17 seconds ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}

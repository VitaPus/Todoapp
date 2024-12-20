import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './task-filter.css';

export default class TaskFilter extends Component {
  render() {
    return (
      <ul className="filters">
        <li>
          <button
            className="selected"
            onClick={() => {
              this.props.statusFilter('all');
              console.log('click');
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              this.props.statusFilter('active');
              console.log('click2');
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button onClick={() => this.props.statusFilter('completed')}>Completed</button>
        </li>
      </ul>
    );
  }
}

TaskFilter.defaultProps = {
  statusFilter: () => {},
};

TaskFilter.propTypes = {
  statusFilter: PropTypes.func,
};

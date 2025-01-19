import React from 'react';
import PropTypes from 'prop-types';

import './task-filter.css';

const TaskFilter = ({ statusFilter }) => {
  return (
    <ul className="filters">
      <li>
        <button
          className="selected"
          onClick={() => {
            statusFilter('all');
            console.log('click');
          }}
        >
          All
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            statusFilter('active');
            console.log('click2');
          }}
        >
          Active
        </button>
      </li>
      <li>
        <button onClick={() => statusFilter('completed')}>Completed</button>
      </li>
    </ul>
  );
};

TaskFilter.defaultProps = {
  statusFilter: () => {},
};

TaskFilter.propTypes = {
  statusFilter: PropTypes.func,
};

export default TaskFilter;
import React from "react";
import PropTypes from "prop-types";

import "./footer.css";
import TaskFilter from "../TaskFilter/task-filter";

const Footer = ({ statusFilter, clearCompleted, completedCount }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{completedCount} items left</span>
      <TaskFilter statusFilter={statusFilter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};
Footer.defaultProps = {
  completedCount: 0,
  statusFilter: () => {},
  clearCompleted: () => {},
};
Footer.propTypes = {
  statusFilter: PropTypes.func,
  clearCompleted: PropTypes.func,
  completedCount: PropTypes.number,
};

export default Footer;

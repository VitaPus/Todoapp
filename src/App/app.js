import React, { useState, useCallback, useRef } from 'react';
import TaskList from '../TaskList';
import NewTaskForm from '../NewTaskForm';
import Footer from '../Footer';
import './app.css';

const App = () => {
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState('all');
  const maxId = useRef(100); // Используем useRef для хранения maxId

  const createTask = (label) => {
    return {
      label,
      done: false,
      edited: false,
      created: Date.now(),
      id: maxId.current++,
    };
  };

  const deleteTask = useCallback((id) => {
    setTodoData((prevTodoData) => prevTodoData.filter((el) => el.id !== id));
  }, []);

  const addTask = useCallback((text) => {
    const newTask = createTask(text);
    setTodoData((prevTodoData) => [...prevTodoData, newTask]);
  }, []);

  const onToggleDone = useCallback((id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      const oldTask = prevTodoData[idx];
      const newTask = { ...oldTask, done: !oldTask.done };
      return [
        ...prevTodoData.slice(0, idx),
        newTask,
        ...prevTodoData.slice(idx + 1),
      ];
    });
  }, []);

  const onToggleEdited = useCallback((id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      if (idx === -1) return prevTodoData;

      const oldTask = prevTodoData[idx];
      return [
        ...prevTodoData.slice(0, idx),
        { ...oldTask, edited: !oldTask.edited },
        ...prevTodoData.slice(idx + 1),
      ];
    });
  }, []);

  // const onUpdateTask = useCallback((id, newLabel) => {
  //   setTodoData((prevTodoData) => {
  //     const idx = prevTodoData.findIndex((el) => el.id === id);
  //     const oldTask = prevTodoData[idx];
  //     const newTask = { ...oldTask, label: newLabel };
  //     return [
  //       ...prevTodoData.slice(0, idx),
  //       newTask,
  //       ...prevTodoData.slice(idx + 1),
  //     ];
  //   });
  // }, []);

  const statusFilter = useCallback((label) => {
    setFilter(label);
  }, []);

  const getVisibleTasks = () => {
    switch (filter) {
      case 'completed':
        return todoData.filter((task) => task.done);
      case 'active':
        return todoData.filter((task) => !task.done);
      default: // "all"
        return todoData;
    }
  };

  const clearCompleted = useCallback(() => {
    setTodoData((prevTodoData) => prevTodoData.filter((task) => !task.done));
  }, []);

  const visibleTasks = getVisibleTasks();

  return (
    <div className="todoapp">
      <NewTaskForm addTask={addTask} />
      <TaskList
        todos={visibleTasks}
        onDeleted={deleteTask}
        onToggleDone={onToggleDone}
        onToggleEdited={onToggleEdited}
      />
      <Footer
        completedCount={todoData.filter((el) => el.done === false).length}
        statusFilter={statusFilter}
        clearCompleted={clearCompleted}
      />
    </div>
  );
};

export default App;
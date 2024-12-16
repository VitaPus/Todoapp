import React, { Component } from "react";
import TaskList from "../TaskList/task-list";
import NewTaskForm from "../NewTaskForm/new-task-form";
import Footer from "../Footer/footer";
import "./app.css";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [],
    filter: "all",
  };

  createTask(label) {
    return {
      label,
      done: false,
      edited: false,
      created: Date.now(),
      id: this.maxId++,
    };
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((el) => el.id !== id);
      return {
        todoData: newArr,
      };
    });
  };

  addTask = (text) => {
    const newTask = this.createTask(text);

    this.setState(({ todoData }) => ({
      todoData: [...todoData, newTask],
    }));
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldTask = todoData[idx];
      const newTask = { ...oldTask, done: !oldTask.done };
      return {
        todoData: [
          ...todoData.slice(0, idx),
          newTask,
          ...todoData.slice(idx + 1),
        ],
      };
    });
  };
  onToggleEdited = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      if (idx === -1) return;

      const oldTask = todoData[idx];
      return {
        todoData: [
          ...todoData.slice(0, idx),
          { ...oldTask, edited: !oldTask.edited }, // Меняем состояние edited
          ...todoData.slice(idx + 1),
        ],
      };
    });
  };

  onUpdateTask = (id, newLabel) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldTask = todoData[idx];
      const newTask = { ...oldTask, label: newLabel };
      return {
        todoData: [
          ...todoData.slice(0, idx),
          newTask,
          ...todoData.slice(idx + 1),
        ],
      };
    });
  };

  statusFilter = (label) => {
    this.setState({ filter: label });
  };

  getVisibleTasks = () => {
    const { todoData, filter } = this.state;

    switch (filter) {
      case "completed":
        return todoData.filter((task) => task.done);
      case "active":
        return todoData.filter((task) => !task.done);
      default: // "all"
        return todoData;
    }
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      // Фильтруем массив задач, отбрасывая выполненные
      const newTodoData = todoData.filter((task) => !task.done);
      return {
        todoData: newTodoData,
      };
    });
  };

  render() {
    const visibleTasks = this.getVisibleTasks();

    return (
      <div className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <TaskList
          todos={visibleTasks}
          onDeleted={this.deleteTask}
          onToggleDone={this.onToggleDone}
          onToggleEdited={this.onToggleEdited}
        />
        <Footer
          completedCount={
            this.state.todoData.filter((el) => el.done === false).length
          }
          statusFilter={this.statusFilter}
          clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }
}

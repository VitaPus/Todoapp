import React, { Component } from "react";
import TaskList from "../TaskList/task-list";
import NewTaskForm from "../NewTaskForm/new-task-form";
import Footer from "../Footer/footer";
import "./app.css";

export default class App extends Component {
  maxId = 100;
  state = {
    todoData: [this.createTask("Drink coffee"), this.createTask("Learn React")],
  };

  createTask(label) {
    return {
      label,
      done: false,
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
      const newArr = [
        ...todoData.slice(0, idx),
        newTask,
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: newArr,
      };
    });
  };

  statusFilter = (label) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((el) => {
          if (label === "completed") {
            return { ...el, vision: el.done }; // Отображаем только завершенные
          }
          if (label === "active") {
            return { ...el, vision: !el.done }; // Отображаем только активные
          }
          return { ...el, vision: true }; // Для "all" показываем все
        }),
      };
    });
  };

  render() {
    return (
      <div className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <TaskList
          todos={this.state.todoData}
          onDeleted={this.deleteTask}
          onToggleDone={this.onToggleDone}
        />
        <Footer statusFilter={this.statusFilter} />
      </div>
    );
  }
}

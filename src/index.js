import React from "react";
import { createRoot } from "react-dom/client";

import TodoList from "./components/todo-list";
import AppHeader from "./components/app-header";
import SearchPannel from "./search-pannel";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

const App = () => {
  const todoData = [
    { label: "Learn React", important: false, id: 1 },
    { label: "Build Awesome App", important: true, id: 2 },
    { label: "Drink Coffee", important: false, id: 3 },
  ];

  return (
    <div>
      <AppHeader />
      <SearchPannel />
      <TodoList todos={todoData} />
    </div>
  );
};

root.render(<App />);

import React from "react";
import "./styles/App.module.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Game } from "./pages/Game";
import Todo from "./pages/Todo";
import MineSweeper from "./pages/MineSweeper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/game" element={<Game />}></Route>
        <Route path="/todo" element={<Todo />}></Route>
        <Route path="/mine" element={<MineSweeper />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

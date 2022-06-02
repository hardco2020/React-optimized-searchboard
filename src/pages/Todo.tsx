import clsx from "clsx";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import style from "./Todo.module.scss";
// 1 -> finished 2 -> unfinshed 0 -> just start

type TodolistProp = {
  todoItem: TodoData;
  // setTodos: React.Dispatch<React.SetStateAction<TodoData[]>>;
};
const TodoItem = React.memo(({ todoItem }: TodolistProp) => {
  const [todo, setTodo] = useState<TodoData>(todoItem);
  console.log("re-render", todo);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const update = todo.status === 1 ? 0 : 1;
    setTodo((todo) => ({
      ...todo,
      status: update,
    }));
  };
  return (
    <div
      className={clsx({
        [style.todo]: true,
        [style.todo_finished]: todo.status === 1,
      })}
    >
      <input
        type="checkbox"
        checked={todo.status === 1 ? true : false}
        // checked={false}
        onChange={(e) => handleChange(e)}
        className={style.check}
      />
      {/* <div className={style.status}></div> */}
      <label className={style.text}>{todo.title}</label>
    </div>
  );
});

type TodoData = {
  id: string;
  title: string;
  status: number;
};

const Todo = () => {
  const [todos, setTodos] = React.useState<TodoData[]>([]);
  const [title, setTitle] = React.useState<string>("");
  const handleAdd = () => {
    const new_todo: TodoData = {
      id: uuidv4(),
      title,
      status: 0, //just start
    };
    setTodos((prev) => [...prev, new_todo]);
    setTitle("");
  };
  return (
    <div className={style.wrapper}>
      <h1>Todolist</h1>
      <div className={style.add}>
        <input
          placeholder="Add the thing ..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAdd}> ADD</button>
      </div>
      <div className={style.board}>
        {todos.map((todo) => {
          return <TodoItem todoItem={todo} key={todo.id} />;
        })}
      </div>
    </div>
  );
};

export default Todo;

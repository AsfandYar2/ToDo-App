import React, { useState, useEffect } from "react";
import "./Todo.css";
import uuid from "uuid";

function Todo() {
  const val = () => {
    const LS = localStorage.getItem("todo");
    return LS ? JSON.parse(LS) : [];
  };

  const [todolist, setTodolist] = useState(val);

  useEffect(() => localStorage.setItem("todo", JSON.stringify(todolist)), [
    todolist
  ]);

  let [value, setValue] = useState("");

  const handleKey = e => {
    let code = e.keyCode || e.which;
    if (code === 13 && e.target.value !== "") {
      setTodolist([...todolist, { value, class: "list", id: uuid() }]);
      setValue("");
    }
  };

  const handleDelete = w => {
    const newarr = todolist.filter(e => e.id !== w.id);
    setTodolist(newarr);
  };

  const handleRemoveAll = () => {
    setTodolist([]);
  };

  const handleShould = () => {
    const randomNum = Math.floor(Math.random() * todolist.length);

    const selected =
      todolist[randomNum].class == "list"
        ? todolist[randomNum].value
        : "task done";
    // console.log(selected);
    alert(selected);
  };
  const handleSelect = s => {
    let newarr = todolist.map(i =>
      i.id === s.id ? { ...i, class: s.class === "list" ? "click" : "list" } : i
    );
    console.log(newarr);
    setTodolist(newarr);
  };

  return (
    <div className="main">
      <div className="container shadow-lg  rounded border  border-info">
        <div className="box">
          <h2>Todo App</h2>
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyPress={handleKey}
            placeholder="Enter your task"
          />
          <div className="flex">
            <button
              className="shouldbtn"
              disabled={todolist.length < 1}
              onClick={handleShould}
            >
              What Should I Do?
            </button>
          </div>
          <div className="flex">
            <h1>Your_Tasks:</h1>
            <h3>
              {todolist.length < 1 &&
                "No tasks available!Please Enter your Tasks :)"}
            </h3>
            <button
              className="removeAll"
              disabled={todolist.length < 1}
              onClick={handleRemoveAll}
            >
              RemoveAll
            </button>
          </div>
          {todolist.map((w, i) => {
            return (
              <div className=" flex alert alert-danger">
                <p className={w.class} onClick={() => handleSelect(w)}>
                  <span>{i + 1}.</span> {w.value}
                </p>
                <button className="button" onClick={() => handleDelete(w)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Todo;

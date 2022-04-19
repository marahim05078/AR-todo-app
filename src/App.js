import { useState } from "react";
import "./App.css";

function App() {
  const [toDoTitle, setToDoTitle] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableItem, setEditableItem] = useState(null);

  const addtodohandler = () => {
    if (!toDoTitle) {
      alert("Please enter a valid Title.");
    } else {
      const toDoItem = {
        id: Date.now(),
        title: toDoTitle,
        isComplete: false,
      };
      setToDoList([...toDoList, toDoItem]);
      setToDoTitle("");
    }
  };

  const deletehandler = (id) => {
    const newToDoList = toDoList.filter((item) => item.id !== id);
    setToDoList(newToDoList);
  };
  const edithandler = (id) => {
    const tobeEdited = toDoList.find((item) => item.id === id);
    setEditMode(true);
    setEditableItem(tobeEdited);
    setToDoTitle(tobeEdited.title);
  };
  const updatehandler = () => {
    setToDoList(
      toDoList.map((todo) => {
        if (todo.id === editableItem.id) {
          todo.title = toDoTitle;
        }
        return todo;
      })
    );
    setEditMode(false);
    setToDoTitle("");
  };
  return (
    <div className="app">
      <h2>Simple To-Do App</h2>
      <div className="todo">
        <input
          type="text"
          value={toDoTitle}
          onChange={(e) => setToDoTitle(e.target.value)}
        />
        <button onClick={() => (editMode ? updatehandler() : addtodohandler())}>
          {editMode ? "Update todo" : "Add todo"}
        </button>
      </div>
      <div className="todo-list">
        <p>Uncomplete item list</p>
        <ul>
          {toDoList.map((todo) => (
            <li key={todo.id}>
              <input type="checkbox" />
              <span>{todo.title}</span>
              <button onClick={() => edithandler(todo.id)}>Edit</button>
              <button onClick={() => deletehandler(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

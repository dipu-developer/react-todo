import React, { useState, useEffect } from "react";
import "./style.css";
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputdata, setInput] = useState("");
  const [items, setItems] = useState(getLocalData);
  const [isEditItem, setEditItem] = useState();
  const [toggleButtom, setToggle] = useState(false);
  const addItems = () => {
    if (!inputdata) {
      alert("please fill this data");
    } else if (inputdata && toggleButtom) {
      setItems(
        items.map((curEle) => {
          if (curEle.id === isEditItem) {
            return { ...curEle, name: inputdata };
          }
          return curEle;
        })
      );
      setInput("")
      setToggle(false)
      setEditItem(null)
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInput("");
    }
  };
  const editItem = (index) => {
    console.log(index);
    const edit = items.find((curEle) => {
      return curEle.id === index;
    });
    setInput(edit.name);
    setEditItem(index);
    setToggle(true);
  };
  const deleteItem = (index) => {
    const updateItem = items.filter((curEle) => {
      return curEle.id !== index;
    });
    setItems(updateItem);
  };
  const removeALL = () => {
    setItems([]);
  };
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);
  return (
    <div>
      <h2>Add Your List Here</h2>
      <div className="main">
        <input
          type="text"
          placeholder="Enter your list here"
          onChange={(event) => setInput(event.target.value)}
          value={inputdata}
        />
        <button onClick={addItems}>Add</button>
        <button onClick={removeALL}>Remove All</button>
      </div>
      <div className="list">
        {items.map((curEle, index) => {
          return (
            <div className="lst" key={index}>
              <h3>{curEle.name}</h3>
              <button onClick={() => editItem(curEle.id)}>Edit</button>
              <button onClick={() => deleteItem(curEle.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;

import React, { useEffect, useState } from "react"
import { MdAdd, MdOutlineDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi"
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import "./styles/styles.css";

function IndexPopup() {
  const [tasks, setTasks] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>("")
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    setTasks(storedTasks)
  }, [])

  useEffect(() => {
    // Save tasks to localStorage whenever tasks state changes
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inputValue.trim() !== "") {
      if (editIndex !== null) {
        // If editIndex is not null, it means we are editing an existing task
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = inputValue.trim();
        setTasks(updatedTasks);
        setEditIndex(null); // Reset editIndex after editing
      } else {
        setTasks([...tasks, inputValue.trim()]);
      }
      setInputValue("");
    }
  }

  const handleEditTask = (index: number) => {
    setEditIndex(index);
    setInputValue(tasks[index]);
    toast.success("Login successful!");
  };

  const handleTaskRemoval = (index: number) => {
    const updatedTasks = [...tasks]
    updatedTasks.splice(index, 1)
    setTasks(updatedTasks)
  }


  return (
    <>
      <div className="App p-4">
        <h1 className="">Todo List</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter a new task..."
            />
            <button type="submit"><MdAdd /></button>
          </div>
        </form>
        <ul className="list-container">
          {tasks.map((task, index) => (
            <li key={index} className="list">
              {task}
              <div className="list-tools">
                <button onClick={() => handleEditTask(index)}><BiEdit /></button>
                <button onClick={() => handleTaskRemoval(index)}><MdOutlineDeleteOutline /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default IndexPopup

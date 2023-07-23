import React, { useEffect, useState } from "react"
import { MdAdd, MdOutlineDeleteOutline } from "react-icons/md";
import "./styles/styles.css";

function IndexPopup() {
  const [tasks, setTasks] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>("")

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
      setTasks([...tasks, inputValue.trim()])
      setInputValue("")
    }
  }

  const handleTaskRemoval = (index: number) => {
    const updatedTasks = [...tasks]
    updatedTasks.splice(index, 1)
    setTasks(updatedTasks)
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new task..."
        />
        <button type="submit"><MdAdd/></button>
        </div>
      </form>
      <ul className="list-container">
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => handleTaskRemoval(index)}><MdOutlineDeleteOutline/></button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default IndexPopup

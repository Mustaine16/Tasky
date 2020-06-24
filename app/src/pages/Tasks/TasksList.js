import React from 'react';

import { useUserContext } from "../../context/userContext"

const TasksList = () => {

  const { state: { user: { tasks } } } = useUserContext();

  console.log("Tasks: ", tasks);

  return (
    <ul>
      {tasks.map(task => {
        return (
          <li key={task.title + task.id}>
            <h1>{task.title}</h1>
            <h2>{task.description}</h2>
            <h3>{task.category.title}</h3>
          </li>
        )
      })}
    </ul>
  )
}

export default TasksList
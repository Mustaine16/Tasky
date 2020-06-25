import React from 'react';

import { useUserContext } from "../../context/userContext"

import Task from "./Task"

const TasksList = () => {

  const { state: { user: { tasks } } } = useUserContext();

  console.log("Tasks: ", tasks);

  return (
    <ul>
      {!tasks.length
        ? "Yo don't have any task, create one!"
        : tasks.map(({ id, title, description, category }) => {
          return <Task key={ title + id } title={title} description={description} category={category} />
        })}

    </ul>
  )
}

export default TasksList
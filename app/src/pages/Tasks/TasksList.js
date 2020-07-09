import React from 'react';

import { useUserContext } from "../../context/userContext"

import Task from "./Task"

const TasksList = () => {

  const { state: { user: { dashboards } } } = useUserContext();

  console.log("dashboards: ", dashboards);

  return (
    <ul>
      {!dashboards.length
        ? "Yo don't have any task, create one!"
        : dashboards.map(task => {
          "hola"
        })}
    </ul>
  )
}

export default TasksList
import React from 'react';

import { useDashboardContext } from "../../context/dashboardContext"

import TasksList from "../Tasks/TasksList"

const Dashboard = () => {

  const { state } = useDashboardContext();
  console.log("TAASSSSKKKSS", state.tasks)
  const { id, name, done, userId, category, tasks, loading } = state

  if (loading) return "Loading"

  return (
    <>
      <h2>{name}</h2>
      {tasks.length
        ?
        <div className="tasksContainer">
          {/* TO-DO'S */}
          <div className="todo">
            <h3>To do</h3>
            <TasksList tasks={tasks} progress="todo"></TasksList>
          </div>
          {/* WORKING ON */}
          <div className="Working On">
            <h3>Working On</h3>
            <TasksList tasks={tasks} progress="working"></TasksList>
          </div>
          {/* DONE */}
          <div className="done">
            <h3>Done</h3>
            <TasksList tasks={tasks} progress="done"></TasksList>
          </div>
        </div>
        : ""}

    </>
  )
}

export default Dashboard
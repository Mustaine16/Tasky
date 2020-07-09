import React from 'react';
import { Link } from "react-router-dom"

import Task from "./Task"
import { useEffect } from 'react';
import { useState } from 'react';

const TasksList = ({ tasks, progress }) => {

  const [filteredTasks, setFilteredTasks] = useState([])

  const filterTasks = () => setFilteredTasks(tasks.filter(task => task.progress === progress))

  useEffect(() => {
    filterTasks();
  }, [])

  useEffect(() => {
    console.log("re-render");
  }, [filteredTasks])

  return (
    <ul>
      {!filteredTasks.length
        ? <li>
          You dont have any task,
            <Link to="/tasks/new">create One!</Link>
        </li>
        : filteredTasks.map(
          ({ id, name, description, category }) => {
            return (
              <Task
                key={name + id}
                name={name}
                description={description}
                category={category}
              >
              </Task>
            )
          })
      }

    </ul>
  )
}

export default TasksList
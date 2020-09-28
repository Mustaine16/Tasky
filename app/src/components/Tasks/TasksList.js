import React from 'react';
import styled from "styled-components"

import Task from "./Task"
import { useEffect } from 'react';
import { useState } from 'react';

const Container = styled.article`
    width: 200px;
    align-self: flex-start;
    padding:10px 7px;
    background: var(--taskList);
    border: 3px solid black;
    scroll-snap-align: center;
`
const List = styled.ul`
`

const TasksList = ({ tasks, progress, title }) => {

  const [filteredTasks, setFilteredTasks] = useState([])

  const filterTasks = () => setFilteredTasks(tasks.filter(task => task.progress === progress))

  useEffect(() => {
    filterTasks();
  }, [])

  useEffect(() => {
    console.log("re-render");
  }, [filteredTasks])

  return (
    <Container>
      <h3>{title}</h3>
      <List>
        {filteredTasks.map(
          ({ id, title, description, category }) => {
            return (
              <Task
                key={title + id}
                title={title}
                description={description}
                category={category}
              >
              </Task>
            )
          })
        }

        Add

      </List>
    </Container>
  )
}

export default TasksList
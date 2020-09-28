import React from 'react';
import styled from 'styled-components';

import { useDashboardContext } from "../../context/dashboardContext"

import TasksList from "../Tasks/TasksList"

const Container = styled.article`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-template-rows: 50px 1fr;
    column-gap: 10%;
    row-gap: 1em;
    padding:.5em 0 0 .5em;
    overflow: scroll;
    scroll-snap-type: x mandatory;
`

const Title = styled.h2`
  grid-area: 1/1/2/-1;
`

const Dashboard = () => {

  const { state } = useDashboardContext();
  const { id, name, done, userId, category, tasks, selected, loading } = state

  if (!selected) return "select one"
  if (loading) return "Loading"

  return (
    <Container>
      <Title>{name}</Title>

      <TasksList tasks={tasks} progress="todo" title="To Do"></TasksList>
      <TasksList tasks={tasks} progress="working" title="Working On"></TasksList>
      <TasksList tasks={tasks} progress="done" title="Done"></TasksList>
    </Container>
  )
}

export default Dashboard
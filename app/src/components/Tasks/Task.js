import React from 'react';
import styled from "styled-components"

const Styled= {
  Task: styled.li`
    padding:3px;
    background:var(--task);
    border-radius:3px;
  `
}

const Task = ({ id, title, description, category }) => {
  return (
    <Styled.Task>
      <h3>{title}</h3>
      <h4>{description}</h4>
      <h5>{category ? category.title : ""}</h5>
    </Styled.Task>
  )
}

export default Task
import React from 'react';

const Task = ({ id, title, description, category }) => {
  return (
    <li>
      <h1>{title}</h1>
      <h2>{description}</h2>
      <h3>{category ? category.title : ""}</h3>
    </li>
  )
}

export default Task
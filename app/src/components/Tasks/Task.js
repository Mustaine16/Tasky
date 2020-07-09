import React from 'react';
import { Link } from "react-router-dom"

const Task = ({ id, name, description, category }) => {
  return (
    <li>
      <h1>{name}</h1>
      <h2>{description}</h2>
      <h3>{category ? category.title : ""}</h3>
    </li>
  )
}

export default Task
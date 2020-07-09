import React from 'react';
import { Link } from "react-router-dom"

const DashboardLink = ({ id, name, description, category }) => {
  return (
    <li>
      <Link to={`/dashboard/${id}`}>
        <h1>{name}</h1>
        <h2>{description}</h2>
        <h3>{category ? category.title : ""}</h3>
      </Link>
    </li>
  )
}

export default DashboardLink
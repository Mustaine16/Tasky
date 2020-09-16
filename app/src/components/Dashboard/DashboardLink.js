import React from 'react';
import styled from "styled-components"
import { Link } from "react-router-dom"

const MiniDashboard = styled.li`
    background: var(--miniDashboard);
    display: flex;
    flex-flow: column nowrap;
    margin:.4rem 0;
    min-width: 150px;
    /* min-height: 200px; */
    /* padding: .5rem; */
    border-radius: 5px;

`

const MiniDashLink = styled(Link)`

    color: #252525;
    text-decoration: none;
`

const DashboardLink = ({ id, name, description, category }) => {
  return (
    <MiniDashboard>
      <MiniDashLink to={`/dashboard/${id}`}>
        <h2>{name}</h2>
        <h3>{description}</h3>
        <h4>{category ? category.title : ""}</h4>
      </MiniDashLink>
    </MiniDashboard>
  )
}

export default DashboardLink
import React from 'react';
import styled from "styled-components"
import { Link } from "react-router-dom"

const MiniDashboard = styled.li`
    display: flex;
    flex-flow: column nowrap;
    margin:.4rem 0;
    min-width: 150px;
    padding: 0 0 .5em .3em;
    background: var(--miniDashboard);
    border-top:.5em solid var(--navbarBackground);
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
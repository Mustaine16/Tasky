import React from 'react';
import styled from "styled-components"
import { Link } from "react-router-dom"

import { useUserContext } from "../../context/userContext"

import DashboardLink from "./DashboardLink"

const Styled = {
  DashboardList: styled.section`
    display: flex;
    /* justify-content: space-evenly; */
    flex-direction: column;
    width:100%;
    padding:.5rem;
    background-color:#f0f0f0;
    `,
  Ul: styled.ul`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap:10%;
    padding:.5rem;
  `
};

const DashboardsList = () => {

  const { state: { user: { dashboards } } } = useUserContext();

  console.log("dashboards: ", dashboards);

  return (
    <Styled.DashboardList>
      <h1>My Dashboards</h1>
      <Styled.Ul>
        {!dashboards.length
          ? (
            <li>
              You don't have any dashboard,
              <Link to="/dashboards/new">create One!</Link>
            </li>
          )
          : dashboards.map(
            ({ id, name, description, category }) => {
              return (
                <DashboardLink
                  id={id}
                  key={name + id}
                  name={name}
                  description={description}
                  category={category}
                >
                </DashboardLink>
              )
            })
        }
      </Styled.Ul>

    </Styled.DashboardList>
  )
}

export default DashboardsList
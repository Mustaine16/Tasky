import React from 'react';
import styled from "styled-components"
import { Link } from "react-router-dom"

import { useUserContext } from "../../context/userContext"

import DashboardLink from "./DashboardLink"

const Styled = {
  DashboardList: styled.ul`
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    padding:.5rem;
    @media screen and (min-width:1024px){
      flex-direction: row
    }
    `
};

const DashboardsList = () => {

  const { state: { user: { dashboards } } } = useUserContext();

  console.log("dashboards: ", dashboards);

  return (
    <Styled.DashboardList>
      {!dashboards.length
        ? <li>
          You dont have any task,
            <Link to="/dashboards/new">create One!</Link>
        </li>
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
          })}

    </Styled.DashboardList>
  )
}

export default DashboardsList
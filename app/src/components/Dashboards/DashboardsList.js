import React from 'react';
import { Link } from "react-router-dom"

import { useUserContext } from "../../context/userContext"

import DashboardLink from "./DashboardLink"

const DashboardsList = () => {

  const { state: { user: { dashboards } } } = useUserContext();

  console.log("dashboards: ", dashboards);

  return (
    <ul>
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

    </ul>
  )
}

export default DashboardsList
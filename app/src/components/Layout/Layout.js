import React from 'react';
import { Link } from "react-router-dom"

import { useUserContext } from "../../context/userContext"

import Logout from "../Logout"

const Layout = ({ children }) => {

  const { state: { user } } = useUserContext();

  return (
    <>
      <main>
        <nav>
          <ul>
            {(user && user.name)
              ?
              (<>
                <h1>Hi {user.name}!</h1>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/tasks/new">Create</Link></li>
                <Logout/>
              </>)
              : ""
            }
          </ul>
        </nav>
        {children}
      </main>
    </>
  )
}

export default Layout
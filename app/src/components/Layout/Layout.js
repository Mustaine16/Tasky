import React from 'react';

import { Link } from "react-router-dom"

const Layout = ({children}) => {
  return (
    <>
      <main>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
        {children}
      </main>
    </>
  )
} 

export default Layout
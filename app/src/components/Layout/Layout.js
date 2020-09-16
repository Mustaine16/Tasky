import React from 'react';
import { Link } from "react-router-dom"
import styled from "styled-components";

import { useUserContext } from "../../context/userContext"
import CreateDashboardButton from "../Dashboard/CreateDashboardButton"
import Logout from "../Logout"

const Navbar = styled.nav`
  display: flex;
  align-items:center;
  justify-content:space-between;
  width:100%;
  background: #5491ee;
`;

const NavLink = styled(Link)`
  color: whitesmoke;
  text-decoration:none;
`;


const Layout = ({ children }) => {
  const { state: { user } } = useUserContext();
  
  return (
    <>
      <main>
        <Navbar>
          <NavLink to="/">Home</NavLink>
          <CreateDashboardButton/>
          {user && <Logout />}
        </Navbar>
        {children}
      </main>
    </>
  )
}

export default Layout
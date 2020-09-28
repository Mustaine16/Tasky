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
  height:50px;
  width:100%;
  background: var(--navbarBackground);
`;

const NavLink = styled(Link)`
  color: whitesmoke;
  text-decoration:none;
`;

const Main = styled.main`
  display:flex;
  min-height: calc(100vh - 50px)
  /* flex-direction:column; */
`;


const Layout = ({ children }) => {
  const { state: { user } } = useUserContext();

  return (
    <>
      <Navbar>
        <NavLink to="/">Home</NavLink>
        <CreateDashboardButton />
        {user && <Logout />}
      </Navbar>
      <Main>
        {children}
      </Main>
    </>
  )
}

export default Layout
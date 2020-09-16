import React from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"

import { useUserContext } from "../context/userContext"

const Logout = () => {
  const { actions: { logoutUser } } = useUserContext();
  const history = useHistory()
  const handleLogout = () => {
    fetch(
      "http://localhost:3000/sessions?_method=DELETE",
      {
        method: "POST",
        credentials: "include"
      }
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        logoutUser();
        history.push("/login")
      })
      .catch(err => console.log(err))
  }

  const Button = styled.button`
    background: #FB6962;
    padding:.5rem;
    border-radius:5px;
    border:none;
  `;

  return <Button onClick={handleLogout}>Logout</Button>

}

export default Logout
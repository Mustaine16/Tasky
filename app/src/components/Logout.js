import React from "react"
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

  return <button onClick={handleLogout}>Logout</button>

}

export default Logout
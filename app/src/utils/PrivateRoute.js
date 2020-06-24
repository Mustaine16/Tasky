import React from 'react';
import { Route, Redirect } from 'react-router-dom'

import { useUserContext } from "../context/userContext"

// import useIsAuth from "../hooks/useIsAuth"

const PrivateRoute = ({ component, ...props }) => {

  const { state: { user } } = useUserContext();
  const isAuth = !!(user && user.id)

  return <Route {...props} component={ isAuth ? component : ()=><Redirect to="/login" />} />

}

export default PrivateRoute
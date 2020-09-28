import React from 'react';
import { Route, Redirect } from 'react-router-dom'

import { useUserContext } from "../context/userContext"


const PrivateRoute = ({ component, ...props }) => {

  const { state } = useUserContext();
  const { user } = state
  const isAuth = !!(user && user.id)

  console.log("AUTH:", isAuth);
  console.log("LOADING:", state.loading);
  
  return <Route {...props} component={isAuth && !state.laoding ? component : () => <Redirect to="/login" />} />

}

export default PrivateRoute
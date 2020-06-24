import React, {useState} from 'react';
import { useUserContext } from "../context/userContext"

const isAuth = () => {

  const { state: { user } } = useUserContext();
  const [authState,setAuthState] = useState(user)

  console.log(user.id);
  console.log("IS AUTH: " , !!user.id)
  setAuthState(!!user.id)
  return authState
}

export default isAuth

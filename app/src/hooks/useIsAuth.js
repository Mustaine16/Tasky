import React, { useState, useEffect } from 'react';

import { useUserContext } from "../context/userContext"

const useIsAuth = () => {
  const [isAuth, setIsAuth] = useState(false)
  const { state: { user } } = useUserContext();

  useEffect(() => {
    setIsAuth((user && user.id) ? true : false)
  }, [user])


  return isAuth
}

export default useIsAuth
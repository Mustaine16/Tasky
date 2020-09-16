import React, { useReducer, useEffect } from "react";


const initialState = {
  user: {},
  token: {},
  loading: true
};

const UserContext = React.createContext(initialState);

const userReducer = (state, action) => {
  switch (action.type) {

    case "INIT_LOGIN":
      return {
        ...state,
        loading: true
      };

    case "LOGIN_USER":
      return {
        ...state,
        user: action.payload.user || null,
        token: action.payload.token || null,
        loading: false
      };

    case "LOGOUT_USER":
      return {
        ...state,
        user: null,
        token: null
      };

    case "INIT_TASK":
      return {
        ...state,
        loading: true,
      };

    case "ADD_DASHBOARD":
      return {
        ...state,
        user: {
          ...state.user,
          dashboards: {
            ...state.user.dashboards,
            ...action.payload.newDashboard
          }

        }
      }
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  //Check if the user is logged in, sending the cookies
  useEffect(() => {

    console.log("Checking if user is logged in, sending cookies");

    initLogin(); //Fires the loading

    fetch("http://localhost:3000/sessions/check",
      {
        method: "POST",
        credentials: "include" //This will send the cookies
      }
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        const { token, user } = res
        loginUser({ token, user })
      })
      .catch(err => console.log(err))
  }, [])


  function initLogin() {
    dispatch({ type: "INIT_LOGIN" })
  }

  function loginUser({ user, token }) {
    dispatch({
      type: "LOGIN_USER",
      payload: { user, token }
    });
  }

  function logoutUser() {
    dispatch({
      type: "LOGOUT_USER",
      payload: null
    });
  }

  function editUser({ updatedUser }) {
    dispatch({
      type: "EDIT_USER",
      payload: updatedUser,
    });
  }

  function addDashboard({ newDashboard }) {
    dispatch({
      type: "ADD_DASHBOARD",
      payload: newDashboard
    })
  }

  return (
    <UserContext.Provider
      value={{
        state,
        actions: {
          loginUser,
          logoutUser,
          editUser,
          addDashboard
        }
      }}>
      {state.loading ? "Loading" : children}
    </UserContext.Provider>
  );
};

function useUserContext() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}

export { UserProvider, useUserContext };

import React, { useReducer } from "react";


const initialState = {
  user: {},
  token: {},
};

const UserContext = React.createContext(initialState);

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload
      };
    case "CREATE_USER":
      return {
        ...state,
        user: action.payload.user,
        token:action.payload.token
      };

    case "EDIT_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "GET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGIN_USER":
      return {
        ...state,
        user: action.payload.user,
        token:action.payload.token
      };

    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  function setToken({ token }) {
    dispatch({
      type: "SET_TOKEN",
      payload:token
    })
  }

  function createUser({ user, token }) {
    dispatch({
      type: "CREATE_USER",
      payload: { user, token }
    });
  }

  function editUser({ updatedUser }) {
    dispatch({
      type: "EDIT_USER",
      payload: updatedUser,
    });
  }

  function getUser({ user }) {
    dispatch({
      type: "GET_USER",
      payload: user,
    });
  }

  function loginUser({ user,token }) {
    dispatch({
      type: "LOGIN_USER",
      payload: { user, token }
    });
  }

  return (
    <UserContext.Provider
      value={{
        state,
        actions: {
          setToken,
          createUser,
          loginUser,
          editUser,
          getUser,
        },
      }}>
      {children}
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

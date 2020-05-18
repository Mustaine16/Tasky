import React, { useReducer } from "react";

const initialState = {};

const UserContext = React.createContext(initialState);

const userReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_USER":
      return {
        ...state,
        user: action.payload,
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
        user: action.payload,
      };

    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  function createUser({ newUser }) {
    dispatch({
      type: "CREATE_USER",
      payload: newUser,
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

  function loginUser({ user }) {
    dispatch({
      type: "LOGIN_USER",
      payload: user,
    });
  }

  return (
    <UserContext.Provider
      value={{
        state,
        actions: {
          createUser,
          loginUser,
          editUser,
          getUser,
        },
      }}
    >
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

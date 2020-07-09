import React, { useReducer, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom"

const initialState = {
  id: "",
  name: "",
  done: "",
  userId: "",
  category: { title: "" },
  tasks: [],
  loading: true,
  error: false
}

const DashboardContext = React.createContext(initialState)

const dashboardReducer = (state, action) => {
  switch (action.type) {

    case "INIT_LOADING":
      return {
        ...state,
        loading: true
      };

    case "SET_DASHBOARD":
      return {
        ...state,
        ...action.payload,
        loading: false
      };

    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          action.payload
        ]
      }

    case "ERROR":
      return {
        ...state,
        error: true
      }

    default:
      return { ...state };

  }
}

const DashboardProvider = ({ children }) => {

  const [state, dispatch] = useReducer(dashboardReducer, initialState)
  const { id } = useParams();

  //Load Dashboard
  useEffect(() => {
    const fetchDashboard = async () => {

      dispatch({
        type:"INIT_LOADING"
      })

      try {

        const response = await fetch(`http://localhost:3000/dashboards/${id}`,
          {
            credentials: "include"
          }
        )
        
        if(!response.ok) throw new Error()
        
        const { dashboard } = await response.json();

        console.log(dashboard);

        dispatch({
          type: "SET_DASHBOARD",
          payload: dashboard
        })

      } catch (error) {
        console.log("ERROR IN DASHBOARDCONTEXT", error);
        dispatch({
          type:"ERROR"
        })
        
      }
    }
    fetchDashboard();
  }, [])


  // RENDERS

  if(state.error) return "ERROR LOADING DASHBOARD"

  return (
    <DashboardContext.Provider value={{state,dispatch}}>
      {state.loading ? "loading Dashboard" : children}
    </DashboardContext.Provider>
  )
}

const useDashboardContext = () => {
  const context = useContext(DashboardContext)
  console.log(context);

  if (!context) throw new Error("useDashboardContext must be within a DashboardContextProvider")

  return context
}

export { DashboardProvider, useDashboardContext }
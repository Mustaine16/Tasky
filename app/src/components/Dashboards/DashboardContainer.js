import React from 'react';

import { DashboardProvider } from "../../context/dashboardContext"
import Dashboard from "./Dashboard"

const DashboardContainer = () => {

   return (
     <DashboardProvider>
       <Dashboard/>
     </DashboardProvider>
   )
}

export default DashboardContainer
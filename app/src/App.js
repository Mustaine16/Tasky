import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Context
import { UserProvider } from "./context/userContext";

import PrivateRoute from "./utils/PrivateRoute"

//Components
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboards/Dashboard";
import DashboardContainer from "./components/Dashboards/DashboardContainer";
import DashboardLink from "./components/Dashboards/DashboardLink";
import Home from "./pages/Home"
import Login from "./pages/Users/Login";
import Logout from "./pages/Users/Logout";
import Signup from "./pages/Users/Signup";
import CreateTask from "./pages/Tasks/CreateTask"
import Edit from "./pages/Users/Edit";

function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <Layout>
          <Switch>
            {/* Home*/}
            <PrivateRoute exact path={"/"} component={Home}></PrivateRoute>
            {/* Auth */}
            <Route exact path={"/signup"} component={Signup}></Route>
            <Route exact path={"/login"} component={Login}></Route>
            <Route exact path={"/logout"} component={Logout}></Route>
            {/* User */}
            <Route exact path={"/user/edit"} component={Edit}></Route>
            {/* Dashboard */}
            <Route exact path={"/dashboard"} component={DashboardLink}></Route>
            <Route exact path={"/dashboard/:id"} component={DashboardContainer}></Route>
            {/* Tasks */}
            <Route exact path={"/tasks/new"} component={CreateTask}></Route>
            
          </Switch>
        </Layout>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

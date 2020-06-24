import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Context
import { UserProvider } from "./context/userContext";

import PrivateRoute from "./utils/PrivateRoute"

//Components
import Login from "./pages/Users/Login";
import Logout from "./pages/Users/Logout";
import Signup from "./pages/Users/Signup";
import Edit from "./pages/Users/Edit";
import CreateTask from "./pages/Tasks/CreateTask"
import TasksList from "./pages/Tasks/TasksList"

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <UserProvider>
          {/* Tasks */}
          <PrivateRoute exact path={"/"} component={TasksList}></PrivateRoute>
          <Route exact path={"/tasks/new"} component={CreateTask}></Route>
          <Route exact path={"/signup"} component={Signup}></Route>
          <Route exact path={"/login"} component={Login}></Route>
          <Route exact path={"/logout"} component={Logout}></Route>
          <Route exact path={"/user/edit"} component={Edit}></Route>
        </UserProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Context
import { UserProvider } from "./context/userContext";

//Components
import Login from "./pages/Users/Login";
import Signup from "./pages/Users/Signup";
import Edit from "./pages/Users/Edit";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <UserProvider>
          <Route exact path={"/login"} component={Login}></Route>
          <Route exact path={"/signup"} component={Signup}></Route>
          <Route exact path={"/user/:id/edit"} component={Edit}></Route>
        </UserProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

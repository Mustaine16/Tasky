import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Context
import { UserProvider } from "./context/userContext";

//Components
import Signup from "./pages/Users/Signup";
import Edit from "./pages/Users/Edit";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <UserProvider>
          <Route exact path={"/users/signup"} component={Signup}></Route>
          <Route exact path={"/users/:id/edit"} component={Edit}></Route>
        </UserProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

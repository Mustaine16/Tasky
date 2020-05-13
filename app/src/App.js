import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom"

import Signup from "./pages/User/Signup"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/users/signup"} component={Signup}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;

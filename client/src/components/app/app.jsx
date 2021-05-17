
import React from "react";
import {Switch, Route, Router} from "react-router-dom";
import MainPage from "../main-page/main-page";
import LoginPage from "../login-page/login-page";
import RegisterPage from "../register-page/register-page";
import browserHistory from "../../browser-history";
import {Redirect} from "react-router-dom";
import {AppRoute} from "../../utils/const";
import '../../App.css';


const App = () => {

  return (
    <Router history={browserHistory}>
      <Switch>
        <Route
          exact path={AppRoute.ROOT}
          render={() => (
            <MainPage/>
          )}
        />
        <Route
          exact path={AppRoute.LOGIN}
          render={() => (
            <LoginPage/>
          )}
        />
        <Route
          exact path={AppRoute.REGISTER}
          render={() => (
            <RegisterPage/>
          )}
        />
        <Route
          render={() => (
            <Redirect to={AppRoute.ROOT} />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;

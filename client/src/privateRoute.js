import React from "react";
import { authService } from "./authService";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = authService.loggedIn();

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/Login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

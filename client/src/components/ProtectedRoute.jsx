import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import { refreshAccessToken } from "../api/api";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuth = Cookies.get("uid");

  // generate new access token if expired
  useEffect(() => {
    const token = async () => {
      await refreshAccessToken();
    };
    token();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;

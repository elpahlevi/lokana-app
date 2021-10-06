import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { genNewAccessToken } from "../../api/token";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const uid = Cookies.get("uid");

  // generate new access token if expired
  const token = async () => {
    await genNewAccessToken();
  };
  useEffect(() => {
    token();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (uid) {
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

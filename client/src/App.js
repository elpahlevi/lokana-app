import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Cookies from "js-cookie";

import refreshCredentials from "./api/credentials";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import WrfGen from "./pages/wrfgen";

// Import global css to override leaflet styles
import "./App.css";

// Function to trigger axios interceptors
refreshCredentials();

const App = () => {
  return (
    <>
      <HelmetProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/wrfgen" component={WrfGen} />
          <Route
            path="/logout"
            component={() => {
              Cookies.remove("accessToken");
              Cookies.remove("refreshToken");
              Cookies.remove("uid");
              return <Redirect to="/" />;
            }}
          />
        </Switch>
      </HelmetProvider>
    </>
  );
};

export default App;

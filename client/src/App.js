import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Cookies from "js-cookie";

import refreshCredentials from "./api/credentials";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
import EmailVerified from "./pages/emailVerified";
import WrfGen from "./pages/wrfgen";
import Cmip6Gen from "./pages/cmip6";
import NotFound from "./pages/404";
import Dashboard from "./pages/dashboard/";

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
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password/:resetToken" component={ResetPassword} />
          <Route
            path="/verification/:verificationToken"
            component={EmailVerified}
          />
          <ProtectedRoute path="/wrfgen" component={WrfGen} />
          <ProtectedRoute path="/cmip6gen" component={Cmip6Gen} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route
            path="/logout"
            component={() => {
              Cookies.remove("accessToken");
              Cookies.remove("refreshToken");
              Cookies.remove("uid");
              return <Redirect to="/" />;
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </HelmetProvider>
    </>
  );
};

export default App;

import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Cookies from "js-cookie";
import "./App.css";
import { refreshCredentials } from "./api/token";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EmailVerification from "./pages/EmailVerification";
import WrfGen from "./pages/Wrfgen";
import Cmip6Gen from "./pages/Cmip6gen";
import NotFound from "./pages/404";
// import Dashboard from "./pages/dashboard/";

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
          <Route path="/reset-password/:token" component={ResetPassword} />
          <Route path="/verification/:token" component={EmailVerification} />
          <ProtectedRoute path="/wrfgen" component={WrfGen} />
          <ProtectedRoute path="/cmip6gen" component={Cmip6Gen} />
          {/* <ProtectedRoute path="/dashboard" component={Dashboard} /> */}
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

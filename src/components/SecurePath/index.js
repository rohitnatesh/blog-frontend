// Libraries.

import { useEffect } from "react";
import { Navigate } from "react-router-dom";

// Dependencies.

import { useAuthentication } from "../../components/AuthenticationContext";

// Public.

const SecurePath = ({ children }) => {
  const [auth] = useAuthentication();

  if (auth.isLoggedIn) {
    return children;
  }

  return <Navigate to="/" />;
};

export default SecurePath;

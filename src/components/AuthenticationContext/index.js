// Libraries.

import { createContext, useContext, useMemo, useState } from "react";

// Private.

const defaultValue = {
  isLoggedIn: true,
};

// Public.

const AuthenticationContext = createContext(defaultValue);

export const AuthenticationProvider = ({ children }) => {
  const [authState, setAuthState] = useState(defaultValue);
  const contextValue = useMemo(() => [authState, setAuthState], [authState]);

  // Output the markup.
  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => useContext(AuthenticationContext);

export default AuthenticationContext;

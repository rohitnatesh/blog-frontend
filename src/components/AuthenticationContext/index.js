// Libraries.

import { createContext, useContext, useMemo, useReducer } from 'react';

// Constants.

export const AUTH_ACTION_TYPES = {
  login: Symbol('login'),
  logout: Symbol('logout'),
};

// Private.

const defaultState = {
  isLoggedIn: false,
  id: null,
  email: null,
  username: null,
  birthdate: null,
  gender: null,
  age: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.login:
      sessionStorage.setItem('loginState', JSON.stringify(action.payload));
      return {
        ...state,
        isLoggedIn: true,
        ...action.payload,
      };
    case AUTH_ACTION_TYPES.logout:
      sessionStorage.removeItem('loginState');
      return {
        ...defaultState,
      };
    default:
      return state;
  }
};

const storedState = sessionStorage.getItem('loginState');

const initializer = (state) =>
  storedState
    ? {
        isLoggedIn: true,
        ...JSON.parse(storedState),
      }
    : state;

// Public.

const AuthenticationContext = createContext([{}, () => {}]);

export const AuthenticationProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(reducer, defaultState, initializer);
  const contextValue = useMemo(() => [authState, dispatch], [authState]);

  // Output the markup.
  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => useContext(AuthenticationContext);

export default AuthenticationContext;

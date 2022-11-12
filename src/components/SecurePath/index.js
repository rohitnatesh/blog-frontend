// Libraries.

import { Navigate } from 'react-router-dom';

// Dependencies.

import { useAuthentication } from '../../components/AuthenticationContext';
import Header from '../Header';

// Public.

const SecurePath = ({ children }) => {
  const [auth] = useAuthentication();

  if (auth.isLoggedIn) {
    return <Header>{children}</Header>;
  }

  return <Navigate to="/" />;
};

export default SecurePath;

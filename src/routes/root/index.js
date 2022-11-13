// Libraries.

import { Navigate } from 'react-router-dom';

// Dependencies.

import { useAuthentication } from '../../components/AuthenticationContext';
import LoginForm from '../../components/LoginForm';
import LoginHeader from '../../components/LoginHeader';

// Public.

const Root = () => {
  const [auth] = useAuthentication();

  if (auth.isLoggedIn) {
    return <Navigate to="/articles" />;
  }

  return (
    <LoginHeader>
      <LoginForm />
    </LoginHeader>
  );
};

export default Root;

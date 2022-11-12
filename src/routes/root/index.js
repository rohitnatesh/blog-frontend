// Libraries.

import { Navigate } from 'react-router-dom';

// Dependencies.

import { useAuthentication } from '../../components/AuthenticationContext';
import LoginForm from '../../components/LoginForm';

// Public.

const Root = () => {
  const [auth] = useAuthentication();

  if (auth.isLoggedIn) {
    return <Navigate to="/articles" />;
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Root;

// Libraries.

import { Navigate } from 'react-router-dom';

// Dependencies.

import { useAuthentication } from '../../components/AuthenticationContext';
import SignUpForm from '../../components/SignUpForm';
import LoginHeader from '../../components/LoginHeader';

// Public.

const SignUp = () => {
  const [auth] = useAuthentication();

  if (auth.isLoggedIn) {
    return <Navigate to="/articles" />;
  }

  return (
    <LoginHeader>
      <SignUpForm />
    </LoginHeader>
  );
};

export default SignUp;

// Libraries.

import { Navigate } from "react-router-dom";

// Dependencies.

import { useAuthentication } from "../../components/AuthenticationContext";
import SignUpForm from "../../components/SignUpForm";

// Public.

const SignUp = () => {
  const [auth] = useAuthentication();

  if (auth.isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      Sign up page
      <SignUpForm />
    </div>
  );
};

export default SignUp;

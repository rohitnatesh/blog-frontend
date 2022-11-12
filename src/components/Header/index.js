// Libraries.

import { Button, Container, Typography } from '@mui/material';

// Dependencies.

import {
  useAuthentication,
  AUTH_ACTION_TYPES,
} from '../../components/AuthenticationContext';

// Public.

const Header = ({ children }) => {
  const [authState, dispatch] = useAuthentication();

  const onLogoutClick = () => {
    dispatch({
      type: AUTH_ACTION_TYPES.logout,
    });
  };

  return (
    <Container component="section">
      <header>
        <Button variant="outlined" type="button" onClick={onLogoutClick}>
          Log out
        </Button>
        <Typography variant="h2" align="center">
          Welcome to the blog, {authState.username}!
        </Typography>
      </header>
      <main>{children}</main>
    </Container>
  );
};

export default Header;

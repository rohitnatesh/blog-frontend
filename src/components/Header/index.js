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

  const onLogoutClick = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3001/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      });

      if (response.status !== 200) {
        throw new Error('Logout failed');
      }

      dispatch({ type: AUTH_ACTION_TYPES.logout});
    } catch (error) {
      console.error(error);
    }
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

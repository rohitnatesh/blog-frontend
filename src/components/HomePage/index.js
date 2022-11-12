// Libraries.

import { Button, Paper, TextField, Typography } from '@mui/material';

// Dependencies.

import {
  useAuthentication,
  AUTH_ACTION_TYPES,
} from '../../components/AuthenticationContext';

// Private.

// Public.

const HomePage = () => {
  const [, dispatch] = useAuthentication();

  const onLogoutClick = () => {
    dispatch({
      type: AUTH_ACTION_TYPES.logout,
    });
  };

  return (
    <Paper>
      <Typography variant="h2">Home Page</Typography>

      <Button variant="outlined" type="button" onClick={onLogoutClick}>
        Log out
      </Button>
    </Paper>
  );
};

export default HomePage;

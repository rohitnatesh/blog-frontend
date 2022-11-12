// Libraries.

import { Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Dependencies.

import { useAuthentication } from '../../components/AuthenticationContext';

// Private.



// Public.

const HomePage = () => {
  const navigate = useNavigate();
  const [auth] = useAuthentication();
  const onLogoutClick = () => {
    auth.isLoggedIn = false;
    navigate("/");
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

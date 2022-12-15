// Libraries.

import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

// Dependencies.

import {
  useAuthentication,
  AUTH_ACTION_TYPES,
} from '../../components/AuthenticationContext';
import { useLocation, useNavigate } from 'react-router-dom';

// Public.

const Header = ({ children }) => {
  const [authState, dispatch] = useAuthentication();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isBackButtonVisible = pathname !== '/articles';

  const onBackButtonClickHandler = () => {
    navigate('/articles');
  };

  const onLogoutClick = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Logout failed');
      }

      dispatch({ type: AUTH_ACTION_TYPES.logout });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="section" sx={{ mt: 3, mb: 6 }}>
      <Box component="header" sx={{ mb: 5 }}>
        <Box
          component="nav"
          sx={{
            display: 'flex',
            justifyContent: isBackButtonVisible ? 'space-between' : 'flex-end',
            width: '100%',
            mb: 2,
          }}
        >
          {isBackButtonVisible && (
            <Button type="button" onClick={onBackButtonClickHandler}>
              <ArrowBackIosRoundedIcon sx={{ mr: 1 }} /> Back
            </Button>
          )}
          <Button type="button" onClick={onLogoutClick}>
            Log out
            <LogoutRoundedIcon sx={{ ml: 1 }} />
          </Button>
        </Box>
        <Typography variant="h2" align="center">
          Welcome to the blog, {authState.username}!
        </Typography>
      </Box>
      <main>{children}</main>
    </Container>
  );
};

export default Header;

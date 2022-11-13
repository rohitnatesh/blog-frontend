// Libraries.

import { Container, Typography } from '@mui/material';

// Public.

const LoginHeader = ({ children }) => (
  <Container sx={{ mt: 5, mb: 6 }}>
    <Typography variant="h2" align="center" sx={{ mb: 6 }}>
      Welcome to the blog!
    </Typography>
    {children}
  </Container>
);

export default LoginHeader;

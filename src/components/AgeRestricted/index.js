// Libraries.

import { Alert, Backdrop, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Public.

const AgeRestricted = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate('/articles');
  };

  return (
    <Backdrop open>
      <Alert severity="error">
        <Typography variant="body1">
          This article is restricted for your age! Please come back when you are
          older.
        </Typography>
        <Button sx={{ display: 'block' }} onClick={onClickHandler}>
          Go back to articles
        </Button>
      </Alert>
    </Backdrop>
  );
};

export default AgeRestricted;

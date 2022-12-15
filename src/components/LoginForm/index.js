// Libraries.

import { Formik, Form } from 'formik';
import { Box, Button, TextField, Typography, Stack, Card } from '@mui/material';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Dependencies.

import {
  useAuthentication,
  AUTH_ACTION_TYPES,
} from '../../components/AuthenticationContext';

// Private.

const initialValues = { email: '', password: '' };

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email address is required'),
  password: Yup.string()
    .min(5, 'Should be minimum 5 characters')
    .required('Password is required'),
});

// Public.

const LoginForm = () => {
  const navigate = useNavigate();
  const [, dispatch] = useAuthentication();

  const onSubmitHandler = async (values, formikBag) => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Login failed');
      }

      const responseData = await response.json();
      dispatch({ type: AUTH_ACTION_TYPES.login, payload: responseData });
    } catch (error) {
      console.error(error);
    }
  };

  const onSignUpClick = () => {
    navigate('signup');
  };

  return (
    <Card
      elevation={3}
      sx={{ maxWidth: 400, pt: 3, pb: 6, pl: 4, pr: 4, margin: 'auto' }}
    >
      <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
        Login
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount={false}
        onSubmit={onSubmitHandler}
      >
        {({ getFieldProps, touched, errors }) => (
          <Form noValidate>
            <Stack spacing={3}>
              <TextField
                label="Email Address"
                type="email"
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                {...getFieldProps('email')}
              />
              <TextField
                label="Password"
                type="password"
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                {...getFieldProps('password')}
              />
              <Box>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  sx={{ mr: 2 }}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  type="button"
                  onClick={onSignUpClick}
                >
                  Sign Up
                </Button>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default LoginForm;

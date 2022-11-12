// Libraries.

import { Formik, Form } from 'formik';
import { Button, Paper, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Dependencies.

import { useAuthentication } from '../../components/AuthenticationContext';

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
  const [auth] = useAuthentication();
  const onSubmitHandler = async (values, formikBag) => {
    console.log(values);

    try {
      const response = await fetch('http://127.0.0.1:3001/api/users/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200){
        auth.isLoggedIn = true;
        navigate('home');
        console.log(response);
      }

      
    } catch (error) {
      console.error(error);
    }
  };

  const onSignUpClick = () => {
    navigate('signup');
  };

  return (
    <Paper>
      <Typography variant="h2">Login</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount={false}
        onSubmit={onSubmitHandler}
      >
        {({ getFieldProps, touched, errors }) => (
          <Form noValidate>
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
            <Button variant="contained" color="success" type="submit">
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <Button variant="outlined" type="button" onClick={onSignUpClick}>
        Sign Up
      </Button>
    </Paper>
  );
};

export default LoginForm;

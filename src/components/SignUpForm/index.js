// Libraries.

import { Formik, Form } from 'formik';
import {
  Button,
  TextField,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Card,
  Stack,
  Box,
} from '@mui/material';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Dependencies.

import {
  useAuthentication,
  AUTH_ACTION_TYPES,
} from '../../components/AuthenticationContext';

// Private.

const initialValues = {
  email: '',
  password: '',
  username: '',
  birthdate: '2022-01-31',
  gender: 'M',
  securityQuestion: '',
  securityAnswer: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email address is required'),
  password: Yup.string()
    .min(5, 'Should be minimum 5 characters')
    .required('Password is required'),
  username: Yup.string().required('Name is required'),
  birthdate: Yup.date().required('DOB is required'),
  gender: Yup.string().oneOf(['M', 'F', 'O']).required('Gender is required'),
  securityQuestion: Yup.string().required('Security question is required'),
  securityAnswer: Yup.string().required('Security answer is required'),
});

// Public.

const SignUpForm = () => {
  const navigate = useNavigate();
  const [, dispatch] = useAuthentication();

  const onSubmitHandler = async (values, formikBag) => {
    try {
      const response = await fetch('/api/users/createUser', {
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

  const onCancel = () => {
    navigate('/');
  };

  return (
    <Card
      elevation={3}
      sx={{ maxWidth: 400, pt: 3, pb: 6, pl: 4, pr: 4, margin: 'auto' }}
    >
      <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
        Sign Up
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
              <TextField
                label="Name"
                type="text"
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
                {...getFieldProps('username')}
              />
              <TextField
                label="Date of Birth"
                type="date"
                error={Boolean(touched.birthdate && errors.birthdate)}
                helperText={touched.birthdate && errors.birthdate}
                {...getFieldProps('birthdate')}
              />
              <FormControl>
                <InputLabel id="gender-label" sx={{ bgcolor: '#FFF' }}>
                  Gender
                </InputLabel>
                <Select labelId="gender-label" {...getFieldProps('gender')}>
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                  <MenuItem value="O">Others</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Security Question"
                type="text"
                error={Boolean(
                  touched.securityQuestion && errors.securityQuestion
                )}
                helperText={touched.securityQuestion && errors.securityQuestion}
                {...getFieldProps('securityQuestion')}
              />
              <TextField
                label="Security Answer"
                type="text"
                error={Boolean(touched.securityAnswer && errors.securityAnswer)}
                helperText={touched.securityAnswer && errors.securityAnswer}
                {...getFieldProps('securityAnswer')}
              />
              <Box>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  sx={{ mr: 2 }}
                >
                  Create Account and Login
                </Button>
                <Button
                  variant="outlined"
                  color="warning"
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default SignUpForm;

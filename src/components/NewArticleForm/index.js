// Libraries.

import { Formik, Form } from 'formik';
import { Button, TextField ,Select,
  FormControl,
  InputLabel,
  MenuItem,} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Dependencies.

// Private.

const initialValues = {};

// Public.

const NewArticleForm = () => {
  const navigate = useNavigate();

  const onSubmitHandler = async (values, formikBag) => {
    try {
      const response = await fetch('http://127.0.0.1:3001/api/users/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      });

      if (response.status !== 200) {
        throw new Error('Login failed');
      }

      const responseData = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
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
          <FormControl>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select labelId="gender-label" {...getFieldProps('gender')}>
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
                <MenuItem value="O">Others</MenuItem>
              </Select>
            </FormControl>
          <Button variant="contained" color="success" type="submit">
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewArticleForm;

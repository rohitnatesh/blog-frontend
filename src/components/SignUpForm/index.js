// Libraries.

import { Formik, Form } from "formik";
import {
  Button,
  Paper,
  TextField,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// Dependencies.

import { useAuthentication } from "../../components/AuthenticationContext";

// Private.

const initialValues = {
  email: "",
  password: "",
  username: "",
  birthdate: "2022-01-31",
  gender: "M",
  securityQuestion: "",
  securityAnswer: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email address is required"),
  password: Yup.string()
    .min(5, "Should be minimum 5 characters")
    .required("Password is required"),
  username: Yup.string().required("Name is required"),
  birthdate: Yup.date().required("DOB is required"),
  gender: Yup.string().oneOf(["M", "F", "O"]).required("Gender is required"),
  securityQuestion: Yup.string().required("Security question is required"),
  securityAnswer: Yup.string().required("Security answer is required"),
});

// Public.

const SignUpForm = () => {
  const navigate = useNavigate();
  const onSubmitHandler = async (values, formikBag) => {
    console.log(values);

    try {
      const response = await fetch('http://127.0.0.1:3001/api/users/createUser', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onCancel = () => {
    navigate("/");
  };

  return (
    <Paper>
      <Typography variant="h2">Sign Up</Typography>
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
              {...getFieldProps("email")}
            />
            <TextField
              label="Password"
              type="password"
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              {...getFieldProps("password")}
            />
            <TextField
              label="Name"
              type="text"
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
              {...getFieldProps("username")}
            />
            <TextField
              label="Date of Birth"
              type="date"
              error={Boolean(touched.birthdate && errors.birthdate)}
              helperText={touched.birthdate && errors.birthdate}
              {...getFieldProps("birthdate")}
            />
            <FormControl>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select labelId="gender-label" {...getFieldProps("gender")}>
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
              {...getFieldProps("securityQuestion")}
            />
            <TextField
              label="Security Answer"
              type="text"
              error={Boolean(touched.securityAnswer && errors.securityAnswer)}
              helperText={touched.securityAnswer && errors.securityAnswer}
              {...getFieldProps("securityAnswer")}
            />
            <Button variant="contained" color="success" type="submit">
              Create Account
            </Button>
          </Form>
        )}
      </Formik>
      <Button
        variant="outlined"
        color="warning"
        type="button"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </Paper>
  );
};

export default SignUpForm;

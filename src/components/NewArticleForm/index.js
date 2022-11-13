// Libraries.

import { Formik, Form } from 'formik';
import {
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Stack,
  FormHelperText,
  Snackbar,
  Alert,
} from '@mui/material';
import * as Yup from 'yup';
import { useState } from 'react';

// Dependencies.

// Private.

const initialValues = {
  title: '',
  content: '',
  categoryId: '',
};

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  categoryId: Yup.string().required('Category is required'),
});

// Public.

const NewArticleForm = ({ categories }) => {
  const [isSaveSuccess, setIsSaveSuccess] = useState(false);

  const onCloseHandler = () => {
    setIsSaveSuccess(false);
  };

  const onSubmitHandler = async (values, formikBag) => {
    try {
      const response = await fetch('http://127.0.0.1:3001/api/articles', {
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
        throw new Error('Add failed');
      }

      setIsSaveSuccess(true);
      formikBag.resetForm(initialValues);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validateOnMount={false}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {({ getFieldProps, touched, errors }) => (
          <Form noValidate>
            <Stack spacing={3} maxWidth={800}>
              <TextField
                label="Title"
                type="text"
                error={touched.title && errors.title}
                helperText={touched.title && errors.title}
                {...getFieldProps('title')}
              />
              <FormControl error={touched.categoryId && errors.categoryId}>
                <InputLabel id="category-label" sx={{ bgcolor: '#FFF' }}>
                  Category
                </InputLabel>
                <Select
                  labelId="category-label"
                  {...getFieldProps('categoryId')}
                >
                  {categories.map(({ catid, cname }) => (
                    <MenuItem value={catid} key={catid}>
                      {cname}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.categoryId && errors.categoryId}
                </FormHelperText>
              </FormControl>
              <TextField
                label="Content"
                type="text"
                multiline
                rows={15}
                error={touched.content && errors.content}
                helperText={touched.content && errors.content}
                {...getFieldProps('content')}
              />

              <Button
                variant="outlined"
                type="submit"
                sx={{ width: 'fit-content' }}
              >
                Save
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={isSaveSuccess}
        autoHideDuration={6000}
        onClose={onCloseHandler}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success">Article has been published!</Alert>
      </Snackbar>
    </>
  );
};

export default NewArticleForm;

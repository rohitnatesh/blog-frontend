// Libraries.

import { Container, Typography } from '@mui/material';

// Dependencies.

import NewArticleForm from '../../components/NewArticleForm';

// Public.

const NewArticle = () => {
  return (
    <Container component="section">
      <Typography variant="h3">Write an article</Typography>
      <NewArticleForm />
    </Container>
  );
};

export default NewArticle;

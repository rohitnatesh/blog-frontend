// Libraries.

import { CircularProgress, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

// Dependencies.

import NewArticleForm from '../../components/NewArticleForm';

// Public.

const NewArticle = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3001/api/categories', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          credentials: 'include',
          mode: 'cors',
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch categories');
        }

        const responseData = await response.json();
        setCategories(responseData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fn();
  }, []);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Container component="section">
      <Typography variant="h4" component="h3" mb={3}>
        New article
      </Typography>
      <NewArticleForm categories={categories} />
    </Container>
  );
};

export default NewArticle;

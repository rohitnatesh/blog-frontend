// Libraries.

import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AllArticles from '../AllArticles';

// Dependencies.

// Public.

const SimilarReading = ({ article }) => {
  const { id: articleId, category } = article;
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:3001/api/articles?categoryId=${category.id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
          }
        );

        if (response.status !== 200) {
          throw new Error('Failed to fetch articles');
        }

        const responseData = await response.json();
        const filteredData = responseData.filter(({ id }) => id !== articleId);

        setArticles(filteredData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fn();
  }, [articleId, category.id]);

  return articles.length ? (
    <Container component="section">
      <Typography variant="h4">Read more in {category.name}</Typography>
      <AllArticles articles={articles} />
    </Container>
  ) : null;
};

export default SimilarReading;

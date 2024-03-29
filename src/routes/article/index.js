// Libraries.

import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

// Dependencies.

import AllArticles from '../../components/AllArticles';

// Public.

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {
      try {
        const response = await fetch('/api/articles', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch articles');
        }

        const responseData = await response.json();
        setArticles(responseData);
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
    <AllArticles articles={articles} isNewArticleButtonVisible />
  );
};

export default Article;

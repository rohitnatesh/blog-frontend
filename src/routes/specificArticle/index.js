// Libraries.

import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

// Dependencies.

import Article from '../../components/Article';
import SimilarReading from '../../components/SimilarReading';
import Comments from '../../components/Comments';

// Public.

const SpecificArticle = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:3001/api/articles/${articleId}`,
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
          throw new Error('Failed to fetch article');
        }

        const responseData = await response.json();
        setArticle(responseData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fn();
  }, [articleId]);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Article article={article} />
      <Comments article={article} />
      <SimilarReading article={article} />
    </>
  );
};

export default SpecificArticle;

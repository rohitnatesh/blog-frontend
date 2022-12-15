// Libraries.

import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

// Dependencies.

import Article from '../../components/Article';
import SimilarReading from '../../components/SimilarReading';
import Comments from '../../components/Comments';
import AgeRestricted from '../../components/AgeRestricted';

// Public.

const SpecificArticle = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [ageRestricted, setAgeRestricted] = useState(false);

  useEffect(() => {
    const fn = async () => {
      try {
        const response = await fetch(`/api/articles/${articleId}`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        if (response.status !== 200) {
          if (response.status === 403) {
            const responseData = await response.json();

            if (responseData.error === 'AGE_RESTRICTION') {
              setAgeRestricted(true);
              return;
            }
          }

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

  if (ageRestricted) {
    return <AgeRestricted />;
  }

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

// Libraries.

import {
  Button,
  Typography,
  Box,
  Card,
  Grid,
  CardContent,
  CardActions,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

// Dependencies.

// Private.

// Public.

const AllArticles = ({ articles, isNewArticleButtonVisible }) => {
  const navigate = useNavigate();

  const onReadHandler = (articleId) => {
    navigate(`/articles/${articleId}`);
    window.scrollTo(0, 0);
  };

  const onNewArticleClick = () => {
    navigate(`/articles/new`);
  };

  return (
    <Grid container spacing={2}>
      {isNewArticleButtonVisible ? (
        <Grid item>
          <Card
            variant="elevation"
            elevation={3}
            sx={{
              width: 350,
              height: 200,
              border: 'none',
              cursor: 'pointer',
            }}
            component="button"
            type="button"
            onClick={onNewArticleClick}
          >
            <Stack spacing={1} alignItems="center">
              <AddCircleOutlineRoundedIcon fontSize="large" />
              <Typography variant="h5" component="span">
                New Article
              </Typography>
            </Stack>
          </Card>
        </Grid>
      ) : null}

      {articles.map((article, index) => {
        const [date] = article.publishTime.split('T');
        const onClickHandler = () => onReadHandler(article.id);

        return (
          <Grid item key={index}>
            <Card
              variant="elevation"
              elevation={3}
              sx={{
                width: 350,
                height: 200,
              }}
            >
              <CardContent
                sx={{
                  paddingLeft: 3,
                  paddingRight: 3,
                  paddingTop: 2,
                  paddingBottom: 1,
                }}
              >
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  <Box
                    component="span"
                    display="flex"
                    justifyContent="space-between"
                  >
                    {article.category.name}
                    <span style={{ textAlign: 'left' }}>{date}</span>
                  </Box>
                </Typography>
                <Typography variant="h5" component="h3">
                  {article.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {article.username}
                </Typography>
              </CardContent>

              <CardActions
                sx={{
                  paddingLeft: 3,
                  paddingRight: 3,
                  paddingBottom: 2,
                  paddingTop: 0,
                }}
              >
                <Button size="small" type="button" onClick={onClickHandler}>
                  Read Article
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AllArticles;

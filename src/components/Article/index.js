// Libraries.

import { Container, Typography, Divider, Stack } from '@mui/material';

// Public.

const Article = ({ article }) => {
  const { category, title, username, publishTime, content, comments } = article;
  let [date] = publishTime.split('T');

  return (
    <Container sx={{ mt: 5, mb: 7 }} component="article">
      <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
        {category.name}
      </Typography>
      <Typography variant="h3">{title}</Typography>
      <Stack
        direction="row"
        divider={
          <Divider
            orientation="vertical"
            color="#888888"
            flexItem
            sx={{ height: 22 }}
          />
        }
        sx={{ mt: 1, mb: 3 }}
        spacing={2}
      >
        <Typography color="text.secondary">{username}</Typography>
        <Typography color="text.secondary">{date}</Typography>
      </Stack>
      <Typography variant="body1" sx={{ lineHeight: 2 }}>
        {content}
      </Typography>
    </Container>
  );
};

export default Article;

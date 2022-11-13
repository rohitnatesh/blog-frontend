// Libraries.

import {
  Alert,
  Button,
  Container,
  Divider,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

// Dependencies.

// Private.

const CommentBox = ({ articleId, setComments }) => {
  const [comment, setComment] = useState('');
  const [isSaveSuccess, setIsSaveSuccess] = useState(false);

  const onCloseHandler = () => {
    setIsSaveSuccess(false);
  };

  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.length) return;

    const requestBody = {
      articleId,
      content: comment,
    };

    try {
      const response = await fetch('http://127.0.0.1:3001/api/comments', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      });

      if (response.status !== 200) {
        throw new Error('Comment failed');
      }

      setComment('');
      const responseData = await response.json();
      const newComment = {
        ...responseData,
        commentTime: responseData.commentTime.split(' ')[0],
      };
      setComments((previousComments) => [...previousComments, newComment]);
      setIsSaveSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack mt={4} component="form" onSubmit={handleSubmit}>
        <TextField
          onChange={onChangeHandler}
          value={comment}
          multiline
          label="What do you think?"
          rows={4}
          fullWidth
          sx={{ maxWidth: 800 }}
        />
        <Button
          type="submit"
          sx={{ width: 'fit-content', mt: 2 }}
          variant="outlined"
        >
          Post
        </Button>
      </Stack>
      <Snackbar
        open={isSaveSuccess}
        autoHideDuration={6000}
        onClose={onCloseHandler}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success">Comment has been published!</Alert>
      </Snackbar>
    </>
  );
};

// Public.

const Comments = ({ article }) => {
  const { id, comments: initialComments } = article;

  const [comments, setComments] = useState(initialComments);

  return (
    <Container component="section">
      <Typography variant="h4" mb={3}>
        What do our users think?
      </Typography>
      {comments.length ? (
        <Stack component="section" mb={3} spacing={2} maxWidth={800}>
          {comments.map(({ content, username, commentTime }, index) => {
            const [date] = commentTime.split('T');

            return (
              <Paper
                component="article"
                key={index}
                variant="elevation"
                elevation={3}
                sx={{ pt: 2, pb: 2, pl: 3, pr: 3 }}
              >
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
                  sx={{ mb: 1 }}
                  spacing={2}
                >
                  <Typography color="text.secondary">{username}</Typography>
                  <Typography color="text.secondary">{date}</Typography>
                </Stack>
                <Typography variant="body2">{content}</Typography>
              </Paper>
            );
          })}
        </Stack>
      ) : null}

      <CommentBox articleId={id} setComments={setComments} />
    </Container>
  );
};

export default Comments;

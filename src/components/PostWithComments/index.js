import { Box, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import User from '../User';
import Comment from './Comment';

const useStyles = makeStyles(() => ({
  separator: {
    width: '100%',
    height: 1,
    borderWidth: 0,
    backgroundColor: '#eaeaea',
    marginTop: 24,
    marginBottom: 24,
  },
}));

const Post = ({ post }) => {
  const classes = useStyles();
  const { userId, title, body, comments } = post;
  return (
    <Box my={6}>
      <Card>
        <CardContent>
          <User id={userId} />
          <Box position="relative" my={6}>
            <Typography variant="h4" align="left" gutterBottom>
              {title}
            </Typography>
          </Box>
          <Typography component="p" align="left">
            {body}
          </Typography>
          <hr className={classes.separator} />
          <Box>
            {comments.map((comment) => {
              const { id } = comment;
              return <Comment key={id} comment={comment} />;
            })}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;

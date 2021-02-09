import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from '@material-ui/core';
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

const Post = ({ post, isViewOnly }) => {
  const classes = useStyles();
  const { title, body, user, comments } = post;

  const CardContentComponent = isViewOnly ? Box : CardActionArea;

  return (
    <Box my={6}>
      <Card>
        <CardContent>
          <CardContentComponent>
            <User name={user.name} username={user.username} />
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
          </CardContentComponent>
        </CardContent>
      </Card>
    </Box>
  );
};

Post.defaultProps = {
  isViewOnly: true,
};

Post.propTypes = {
  post: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  isViewOnly: PropTypes.bool,
};

export default Post;

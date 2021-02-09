import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import User from '../User';
import Comment from './Comment';

const useStyles = makeStyles(() => ({
  cardLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit',
    },
  },
  separator: {
    width: '100%',
    height: 1,
    borderWidth: 0,
    backgroundColor: '#eaeaea',
    marginTop: 16,
    marginBottom: 0,
  },
}));

const Post = ({ post, isViewOnly }) => {
  const classes = useStyles();
  const { id, title, body, user, comments } = post;

  const CardLinkComponent = isViewOnly ? Box : Link;
  const CardContentComponent = isViewOnly ? Box : CardActionArea;

  return (
    <CardLinkComponent className={classes.cardLink} to={`/post/${id}`}>
      <Box my={6}>
        <Card>
          <CardContentComponent>
            <CardContent>
              <User name={user.name} username={user.username} />
              <Box position="relative" my={isViewOnly ? 6 : 0}>
                <Typography
                  variant={isViewOnly ? 'h4' : 'h6'}
                  align="left"
                  gutterBottom>
                  {title}
                </Typography>
              </Box>
              <Typography component="p" align="left">
                {body}
              </Typography>
            </CardContent>
            {comments && comments.length > 0 && (
              <>
                <Typography
                  style={{ marginTop: 16, marginLeft: 16, marginRight: 16 }}
                  color="textSecondary"
                  component="p"
                  align="left">
                  {comments.length} comment{comments.length > 1 ? 's' : ''}
                </Typography>
                <hr className={classes.separator} />
                <Box>
                  {comments.map((comment) => {
                    const { id: commentId } = comment;
                    return <Comment key={commentId} comment={comment} />;
                  })}
                </Box>
              </>
            )}
          </CardContentComponent>
        </Card>
      </Box>
    </CardLinkComponent>
  );
};

Post.defaultProps = {
  isViewOnly: true,
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  isViewOnly: PropTypes.bool,
};

export default Post;

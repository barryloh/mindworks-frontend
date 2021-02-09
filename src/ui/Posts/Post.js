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

import User from '../../components/User';

const useStyles = makeStyles(() => ({
  cardLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit',
    },
  },
}));

const Post = ({ post }) => {
  const classes = useStyles();

  const { id, user, title, body } = post;
  return (
    <Link className={classes.cardLink} to={`/post/${id}`}>
      <Box my={6}>
        <Card>
          <CardActionArea>
            <CardContent>
              <User name={user.name} username={user.username} />
              <Typography variant="h6" align="left" gutterBottom>
                {title}
              </Typography>
              <Typography component="p" align="left">
                {body}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Link>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Post;

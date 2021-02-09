import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import User from '../User';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: 'rgb(248,248,248)',
    padding: 16,
  },
  separator: {
    width: '100%',
    height: 1,
    borderWidth: 0,
    backgroundColor: '#eaeaea',
    margin: 0,
  },
}));

const Comment = ({ comment }) => {
  const classes = useStyles();

  const { email, name, body } = comment;

  return (
    <>
      <Box className={classes.container}>
        <User email={email} />
        <Typography component="p" align="left">
          {name}
        </Typography>
        <Typography component="p" align="left" color="textSecondary">
          {body}
        </Typography>
      </Box>
      <hr className={classes.separator} />
    </>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;

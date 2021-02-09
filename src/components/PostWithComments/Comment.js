import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import User from '../User';

const Comment = ({ comment }) => {
  const { email, name, body } = comment;
  return (
    <Box my={6}>
      <User email={email} />
      <Typography component="p" align="left">
        {name}
      </Typography>
      <Typography component="p" align="left" color="textSecondary">
        {body}
      </Typography>
    </Box>
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

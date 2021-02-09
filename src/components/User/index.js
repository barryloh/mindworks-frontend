import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const User = ({ email, name, username }) => (
  <Box mb={2}>
    <Typography style={{ fontWeight: 500 }} align="left" component="p">
      {email === undefined || email === null ? (
        <>
          <span>{name}</span>{' '}
          <Typography
            color="textSecondary"
            component="span">{`@${username}`}</Typography>
        </>
      ) : (
        email
      )}
    </Typography>
  </Box>
);
User.defaultProps = {
  email: null,
  name: null,
  username: null,
};

User.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  username: PropTypes.string,
};

export default User;

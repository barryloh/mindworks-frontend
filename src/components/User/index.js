import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const User = ({ name, username }) => (
  // const [name, setName] = useState(null);

  // useEffect(() => {
  //   if (id) {
  //     const data = client.readFragment({
  //       id: `User:${id}`,
  //       fragment: GET_USER_BY_ID,
  //     });
  //     setName(data ? data.name : null);
  //   }
  //
  //   if (email) {
  //     const data = client.readQuery({
  //       query: aa,
  //       variables: {
  //         id,
  //       },
  //     });
  //
  //     const user = data.users.find((el) => el.email === email);
  //     console.log('data', email, data, user);
  //
  //     if (user) {
  //       setName(user.name);
  //     } else {
  //       setName(email);
  //     }
  //   }
  // }, []);

  <Box mb={4}>
    <Typography align="left" component="p">
      {name} @{username}
    </Typography>
  </Box>
);
User.defaultProps = {
  name: null,
  username: null,
};

User.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
};

export default User;

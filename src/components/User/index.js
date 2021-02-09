import { useEffect, useState } from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const aa = gql`
  query GetAllPosts {
    users {
      id
      email
      name
      username
    }
  }
`;

const GET_USER_BY_ID = gql`
  fragment user on User {
    email
    id
    name
    username
  }
`;

const User = ({ id, email }) => {
  const client = useApolloClient();
  const [name, setName] = useState(null);

  useEffect(() => {
    if (id) {
      const data = client.readFragment({
        id: `User:${id}`,
        fragment: GET_USER_BY_ID,
      });
      setName(data.name);
    }

    if (email) {
      const data = client.readQuery({
        query: aa,
        variables: {
          id,
        },
      });

      const user = data.users.find((el) => el.email === email);
      console.log('data', email, data, user);

      if (user) {
        setName(user.name);
      } else {
        setName(email);
      }
    }
  }, []);

  return (
    <Box mb={4}>
      <Typography align="left" component="p">
        {name !== null ? name : 'Loading...'}
      </Typography>
    </Box>
  );
};

User.propTypes = {
  id: PropTypes.number.isRequired,
};

export default User;

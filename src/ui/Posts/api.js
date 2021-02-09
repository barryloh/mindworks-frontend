import { useQuery, gql } from '@apollo/client';

const GET_ALL_POSTS_AND_USERS = gql`
  query GetAllPosts {
    posts {
      userId
      id
      title
      body
    }
    users {
      id
      name
      username
      email
    }
  }
`;

const getPostsAndUsers = () => useQuery(GET_ALL_POSTS_AND_USERS);

export default getPostsAndUsers;

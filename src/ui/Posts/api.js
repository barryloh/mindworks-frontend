import { useQuery, gql } from '@apollo/client';

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts {
      id
      title
      body
      user {
        id
        name
        username
      }
    }
  }
`;

const getAllPosts = () => useQuery(GET_ALL_POSTS);

export default getAllPosts;

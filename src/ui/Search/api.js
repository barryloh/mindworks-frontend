import { useQuery, gql } from '@apollo/client';

const SEARCH_COMMENTS = gql`
  query SearchComments($filter: String!) {
    comments(filter: $filter) {
      id
      post {
        body
        id
        title
        userId
      }
      name
      body
      email
    }
  }
`;

const searchComments = (query) =>
  useQuery(SEARCH_COMMENTS, {
    variables: {
      filter: query,
    },
  });

export default searchComments;

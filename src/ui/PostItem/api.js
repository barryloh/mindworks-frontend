import { useState, useEffect } from 'react';
import { useApolloClient, useQuery, gql } from '@apollo/client';

const GET_POST_BY_ID_CACHE = gql`
  fragment post on Post {
    userId
    id
    title
    body
  }
`;

const GET_POST_BY_ID = gql`
  query GetPostById($id: Int!) {
    post(id: $id) {
      userId
      id
      title
      body
    }
  }
`;

const GET_ALL_COMMENTS_BY_POST = gql`
  query GetAllCommentsByPostId($id: Int!) {
    comments(postId: $id) {
      postId
      id
      name
      email
      body
    }
  }
`;

const getPostAndComments = (postId) => {
  const client = useApolloClient();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const postFromCache = client.readFragment({
      id: `Post:${postId}`,
      fragment: GET_POST_BY_ID_CACHE,
    });

    if (postFromCache) {
      setPost(postFromCache);
      return;
    }

    client
      .query({
        query: GET_POST_BY_ID,
        variables: {
          id: postId,
        },
      })
      .then((result) => {
        setPost(result.data.post);
      });
  }, []);

  const { loading, error, data } = useQuery(GET_ALL_COMMENTS_BY_POST, {
    variables: {
      id: postId,
    },
  });

  return {
    loading,
    error,
    data: {
      ...post,
      comments: data ? data.comments : [],
    },
  };
};

export default getPostAndComments;

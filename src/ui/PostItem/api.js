import { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_POST_BY_ID = gql`
  query GetPostById($id: Int!) {
    post(id: $id) {
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

const GET_ALL_COMMENTS_BY_POST = gql`
  query GetAllCommentsByPostId($id: Int!) {
    comments(postId: $id) {
      id
      name
      email
      body
    }
  }
`;

const getPostAndComments = (postId) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [post, setPost] = useState(null);

  const {
    loading: commentsLoading,
    error: commentsError,
    data: commentsData,
  } = useQuery(GET_ALL_COMMENTS_BY_POST, {
    variables: {
      id: postId,
    },
  });

  const { loading: postLoading, error: postError, data: postData } = useQuery(
    GET_POST_BY_ID,
    {
      variables: {
        id: postId,
      },
    },
  );

  useEffect(() => {
    if (postData && commentsData) {
      setPost({
        ...postData.post,
        comments: commentsData.comments,
      });
    }
  }, [postData, commentsData]);

  useEffect(() => {
    setLoading(postLoading || commentsLoading);
  }, [postLoading, commentsLoading]);

  useEffect(() => {
    setError(postError || commentsError);
  }, [postError, commentsError]);

  return {
    loading: isLoading,
    error,
    data: post,
  };
};

export default getPostAndComments;

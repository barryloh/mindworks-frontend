import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Querystring from 'querystring';
import { Box, Button, Typography } from '@material-ui/core';

import searchComments from './api';
import Post from '../Posts/Post';

const Search = () => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = Querystring.parse(location.search.replace('?', ''));

  const { query } = queryParams;
  const { loading, data, error } = searchComments(query);
  console.log('##data', loading, error, data);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const searchedPosts = [];

    if (data && data.comments) {
      data.comments.forEach((comment) => {
        const { post, ...commentDetails } = comment;
        const { id: postId } = post;

        const foundPost = searchedPosts.find((el) => el.id === postId);
        if (foundPost) {
          foundPost.comments.push(commentDetails);
        } else {
          searchedPosts.push({
            ...post,
            comments: [commentDetails],
          });
        }
      });

      console.log('##searchedPosts', searchedPosts);
      setPosts(searchedPosts);
      return;
    }

    setPosts([]);
  }, [data]);

  return (
    <Box>
      <Typography
        style={{ fontWeight: 600 }}
        variant="h4"
        component="h1"
        align="left">
        Search
      </Typography>
      <Button
        variant="text"
        size="small"
        onClick={() => {
          history.goBack();
        }}>
        Go Back
      </Button>
      {posts.map((post) => {
        const { id } = post;
        return <Post key={id} post={post} />;
      })}
    </Box>
  );
};

export default Search;

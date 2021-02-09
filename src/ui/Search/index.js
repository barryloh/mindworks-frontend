import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Querystring from 'querystring';
import { Box, Button, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import searchComments from './api';
import Post from '../../components/PostWithComments';

const Search = () => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = Querystring.parse(location.search.replace('?', ''));

  const { query } = queryParams;
  const { loading, data, error } = searchComments(query);

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

      setPosts(searchedPosts);
      return;
    }

    setPosts([]);
  }, [data]);

  return (
    <Box>
      <Button
        variant="text"
        size="small"
        onClick={() => {
          history.goBack();
        }}>
        <ArrowBackIcon style={{ marginRight: 8 }} /> Go Back
      </Button>
      <Typography
        style={{ marginTop: 8, fontWeight: 600 }}
        variant="h4"
        component="h1"
        align="left">
        Search
      </Typography>
      <Box style={{ marginTop: 16 }}>
        {loading && (
          <Typography color="textSecondary" component="p">
            Loading...
          </Typography>
        )}
        {!loading && error && (
          <Typography variant="h5" component="p">
            An error has occurred: {error}
          </Typography>
        )}
        {!loading && !error && posts.length === 0 && (
          <Typography variant="h5" component="p">
            No results found
          </Typography>
        )}
        {posts.map((post) => {
          const { id } = post;
          return (
            <Post key={id} post={post} isViewOnly={false} searchQuery={query} />
          );
        })}
      </Box>
    </Box>
  );
};

export default Search;

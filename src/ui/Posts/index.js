import { Box, Typography } from '@material-ui/core';

import getAllPostsAndUsers from './api';
import Post from './Post';

const Posts = () => {
  const { loading, error, data } = getAllPostsAndUsers();
  console.log('##data', data);

  if (error) return <p>Error :(</p>;

  return (
    <Box>
      <Box mb={6}>
        <Typography
          style={{ fontWeight: 600 }}
          variant="h4"
          component="h1"
          align="left">
          All Posts
        </Typography>
      </Box>
      {loading && <Typography component="p">Loading...</Typography>}
      {data && data.posts.map((post) => <Post key={post.id} post={post} />)}
    </Box>
  );
};

export default Posts;

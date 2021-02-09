import { Box, Typography } from '@material-ui/core';

import getAllPosts from './api';
import Post from '../../components/PostWithComments';

const Posts = () => {
  const { loading, error, data } = getAllPosts();

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
      {data &&
        data.posts.map((post) => (
          <Post key={post.id} post={post} isViewOnly={false} />
        ))}
    </Box>
  );
};

export default Posts;

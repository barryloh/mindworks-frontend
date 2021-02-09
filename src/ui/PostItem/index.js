import { Box, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useParams, useHistory } from 'react-router-dom';

import Post from '../../components/PostWithComments';
import getPostAndComments from './api';

const PostItem = () => {
  const history = useHistory();
  const { postId } = useParams();

  const { loading, data } = getPostAndComments(postId);

  return (
    <Box>
      <Box mb={4}>
        <Button
          variant="text"
          size="small"
          onClick={() => {
            history.goBack();
          }}>
          <ArrowBackIcon style={{ marginRight: 8 }} /> Go Back
        </Button>
      </Box>
      {loading || !data ? <p>Loading...</p> : <Post post={data} />}
    </Box>
  );
};

export default PostItem;

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SearchTextHighlighter from 'search-text-highlight';

import User from '../User';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: 'rgb(248,248,248)',
    padding: 16,
  },
  separator: {
    width: '100%',
    height: 1,
    borderWidth: 0,
    backgroundColor: '#eaeaea',
    margin: 0,
  },
}));

const Comment = ({ comment, searchQuery }) => {
  const classes = useStyles();

  const { email, name, body } = comment;

  return (
    <>
      <Box className={classes.container}>
        <User email={SearchTextHighlighter.highlight(email, searchQuery)} />
        <Typography
          component="p"
          align="left"
          dangerouslySetInnerHTML={{
            __html: SearchTextHighlighter.highlight(name, searchQuery),
          }}
        />
        <Typography
          component="p"
          align="left"
          color="textSecondary"
          dangerouslySetInnerHTML={{
            __html: SearchTextHighlighter.highlight(body, searchQuery),
          }}
        />
      </Box>
      <hr className={classes.separator} />
    </>
  );
};

Comment.defaultProps = {
  searchQuery: null,
};

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  searchQuery: PropTypes.string,
};

export default Comment;

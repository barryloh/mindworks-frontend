import { useEffect, useState } from 'react';
import {
  AppBar,
  Container,
  Box,
  Toolbar,
  Typography,
  InputBase,
} from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import Querystring from 'querystring';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    marginLeft: 0,
    width: '100%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    width: '100%',
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Appbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const queryParams = Querystring.parse(location.search.replace('?', ''));

  const { query: queryParamFromURL } = queryParams;

  const [query, setQuery] = useState('');

  useEffect(() => {
    setQuery(queryParamFromURL);
  }, [queryParamFromURL]);

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      console.log('value', e.target.value, history);
      // put the login here

      const path = {
        pathname: '/search',
        search: `?query=${e.target.value}`,
      };

      if (history.location.pathname === '/search') {
        history.replace(path);
        return;
      }

      history.push(path);
    }
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Box position="absolute">
            <Typography variant="h6" noWrap>
              Comments Manager
            </Typography>
          </Box>
          <Container maxWidth="sm">
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onKeyDown={onKeyDown}
                onChange={onChange}
                value={query}
              />
            </div>
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Appbar;

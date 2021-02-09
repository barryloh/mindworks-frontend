import { Switch, Route } from 'react-router-dom';

import Posts from '../ui/Posts';
import PostItem from '../ui/PostItem';
import Search from '../ui/Search';

const AppRouter = () => (
  <Switch>
    <Route path="/post/:postId">
      <PostItem />
    </Route>
    <Route path="/search">
      <Search />
    </Route>
    <Route path="/">
      <Posts />
    </Route>
  </Switch>
);

export default AppRouter;

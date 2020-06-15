import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { langLoad } from 'translations';

import Loader from 'components/Loader';

const App = lazy(() => import('components/App'));
const Home = lazy(() => import('pages/Home'));
const NotFound = lazy(() => import('pages/Errors/NotFound'));

const Routes = () => {
  useEffect(() => {
    langLoad();
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader isFetching />}>
        <App>
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} />} />
            <Route path="*" component={NotFound} />
          </Switch>
        </App>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;

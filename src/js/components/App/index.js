import React from 'react';

import Notifications from 'components/Notifications';
import ErrorBoundary from 'components/ErrorBoundary';

import css from 'styles/components/App.scss';

const App = ({ children }) => (
  <ErrorBoundary>
    <section className={css.app}>
      <div className={css.app__content}>
        <Notifications />
        {children}
      </div>
    </section>
  </ErrorBoundary>
);

export default App;

import React from 'react';
import css from 'styles/components/Loader.scss';

const Loader = ({ isFetching = false }) => {
  if (isFetching) {
    return (
      <div className={css.loader}>
        <div className={css.loader__circle} />
      </div>
    );
  }
  return null;
};

export default Loader;

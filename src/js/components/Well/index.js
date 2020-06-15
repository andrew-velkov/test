import React from 'react';

import strings from 'translations';

import css from 'styles/components/Well.scss';

const Well = () => (
  <div className={css.well}>
    <p>{strings.info.no_data}</p>
  </div>
);

export default Well;

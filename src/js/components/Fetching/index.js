import React from 'react';
import cx from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';

import css from 'styles/components/Fetching.scss';

const Fetching = ({
  color = '#37b759',
  size = 35,
  thickness = 4,
  isHeight = false,
  bg = false,
  reset = false,
  isFetching,
  children,
}) => (
  <div
    style={{ minWidth: size, minHeight: size }}
    className={cx(css.fetching, {
      [css.fetching_height]: isHeight,
    })}
  >
    {isFetching && (
      <div
        className={cx(css.fetching__progress, {
          [css.fetching__progress_background]: bg,
          [css.fetching__progress_reset]: reset,
        })}
      >
        <CircularProgress style={{ color }} size={size} thickness={thickness} />
      </div>
    )}
    {children}
  </div>
);

export default Fetching;

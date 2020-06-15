import React, { memo } from 'react';
import cx from 'classnames';
import { Checkbox, IconButton, Icon } from '@material-ui/core';

import css from 'styles/components/Header.scss';

const AppHeaderComponent = ({
  handleIsEpanded,
  handleSelectedProductList,
  disabled,
  total,
  activeStep,
  handlePrev,
}) => (
  <header className={cx(css.header, css.header_global)}>
    <div className={css.header__container}>
      <ul className={cx(css.buttonGroup, css.buttonGroup_reset)}>
        {activeStep > 0 && (
          <li className={css.buttonGroup__item}>
            <IconButton onClick={handlePrev}>
              <Icon>arrow_back_icon</Icon>
            </IconButton>
          </li>
        )}
        <li className={css.buttonGroup__item}>
          <Checkbox
            disabled={disabled}
            color="secondary"
            checked={total > 0}
            onChange={handleSelectedProductList}
          />
        </li>
      </ul>
      {activeStep === 0 && (
        <h4 className={css.header__title}>
          {'$ '}
          {total}
        </h4>
      )}
      <IconButton disabled={disabled} onClick={handleIsEpanded}>
        <Icon>notes</Icon>
      </IconButton>
    </div>
  </header>
);

export default memo(AppHeaderComponent);

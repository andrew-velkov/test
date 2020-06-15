import React, { memo } from 'react';
import cx from 'classnames';
import { Checkbox, FormControlLabel } from '@material-ui/core';

import css from 'styles/pages/Home.scss';

const AdditionalProductComponent = ({
  additionalData,
  product,
  checkedList,
  handleSelectedProduct,
}) => (
  <React.Fragment>
    {console.log('sd')}
    {additionalData &&
      additionalData.map((additional) => (
        <article
          key={additional._id}
          className={cx(css.productList__item, css.productList__item_flex)}
        >
          <FormControlLabel
            className={css.productItemCheckbox}
            control={
              <Checkbox
                color="primary"
                checked={checkedList.some((item) => item._id === additional._id)}
                onChange={handleSelectedProduct(additional, product)}
              />
            }
            label={
              <div className={css.productItemCheckbox__label}>
                <p className={css.productItemCheckbox__name}>
                  <span>{'to: '}</span>
                  {additional.name}
                </p>
                <p className={css.productItemCheckbox__date}>{additional.date}</p>
              </div>
            }
          />
          <div className={css.productItemPrice}>{additional.price}</div>
        </article>
      ))}
  </React.Fragment>
);

export default memo(AdditionalProductComponent);

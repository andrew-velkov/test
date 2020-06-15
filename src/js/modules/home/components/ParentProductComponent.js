/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { memo } from 'react';
import cx from 'classnames';
import { Checkbox, IconButton, Icon, FormControlLabel } from '@material-ui/core';

import css from 'styles/pages/Home.scss';

const ParentProductComponent = ({
  checkedList,
  handleSelectedProduct,
  data: { product, productItem },
  handleQuantityRemove,
  handleQuantityAdd,
}) => {
  const currentItem = checkedList.find((item) => item._id === product._id);

  return (
    <React.Fragment>
      <FormControlLabel
        className={cx(css.productItemCheckbox, css.productItemCheckbox_parent)}
        control={
          <Checkbox
            color="primary"
            disabled={checkedList.some((item) => item.parentId === productItem._id)}
            checked={checkedList.some((item) => item._id === productItem._id)}
            onChange={handleSelectedProduct(product)}
          />
        }
        label={
          <div className={css.productItemCheckbox__label}>
            <p className={css.productItemCheckbox__name}>
              <span>{'to: '}</span>
              {productItem.name}
            </p>
            <p className={css.productItemCheckbox__date}>{productItem.date}</p>
          </div>
        }
        onClick={(event) => event.stopPropagation()}
        onFocus={(event) => event.stopPropagation()}
      />

      <div
        onClick={(event) => event.stopPropagation()}
        onFocus={(event) => event.stopPropagation()}
        className={css.productItemCounter}
      >
        <IconButton
          size="small"
          className={css.productItemCounter__button}
          onClick={handleQuantityRemove(product._id)}
        >
          <Icon>remove</Icon>
        </IconButton>

        <div className={css.productItemCounter__quantity}>
          {currentItem !== undefined ? currentItem.quantity : 1}
        </div>

        <IconButton
          size="small"
          className={css.productItemCounter__button}
          onClick={handleQuantityAdd(product)}
        >
          <Icon>add</Icon>
        </IconButton>
      </div>

      <div className={css.productItemPrice}>{productItem.price}</div>
    </React.Fragment>
  );
};

export default memo(ParentProductComponent);

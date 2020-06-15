import React, { memo } from 'react';
import cx from 'classnames';
import {
  Icon,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';

import Well from 'components/Well';
import { AdditionalProductComponent, ParentProductComponent } from 'modules/home/components';

import css from 'styles/pages/Home.scss';

const ProductListContainer = ({
  data: { productList, loaded },
  checkedList,
  expanded,
  handleIsEpanded,
  handleSelectedProduct,
  handleQuantityRemove,
  handleQuantityAdd,
  productTitle,
}) => (
  <section className={css.productList}>
    {loaded && (
      <>
        <h1>{productTitle}</h1>
        <ul className={css.productList__wrap}>
          {productList.length > 0 &&
            productList.map((productItem) => {
              const { name, price, _id, date } = productItem;
              const product = { name, price, _id, date };
              const isExpanded = productItem.additional && productItem.additional.length !== 0;

              return (
                <ExpansionPanel
                  key={product._id}
                  className={cx(
                    css.productList__item,
                    css.productList__item,
                    {
                      [css.productList__item_disabled]:
                        productItem.additional && productItem.additional.length === 0,
                    },
                    css.productList__item_expansion,
                  )}
                  defaultExpanded={false}
                  expanded={typeof expanded === 'boolean' ? expanded : expanded === product._id}
                  onChange={handleIsEpanded(product._id)}
                >
                  <ExpansionPanelSummary
                    className={cx(css.productList__panelSummary, {
                      [css.productList__panelSummary_disabled]: !isExpanded,
                    })}
                    expandIcon={
                      isExpanded ? (
                        <Icon className={css.productList__panelSummaryIcon} fontSize="small">
                          arrow_downward
                        </Icon>
                      ) : (
                        <article style={{ marginLeft: '20px' }} />
                      )
                    }
                  >
                    <ParentProductComponent
                      data={{ productItem, product }}
                      checkedList={checkedList}
                      handleQuantityRemove={handleQuantityRemove}
                      handleQuantityAdd={handleQuantityAdd}
                      handleSelectedProduct={handleSelectedProduct}
                    />
                  </ExpansionPanelSummary>

                  <ExpansionPanelDetails
                    className={cx(
                      css.productList__panelDetails,
                      css.productList__panelDetails_parent,
                    )}
                  >
                    <AdditionalProductComponent
                      additionalData={productItem.additional}
                      product={product}
                      checkedList={checkedList}
                      handleSelectedProduct={handleSelectedProduct}
                    />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            })}
        </ul>
      </>
    )}
    {loaded && (productList === undefined || productList.length === 0) && <Well />}
  </section>
);

export default memo(ProductListContainer);

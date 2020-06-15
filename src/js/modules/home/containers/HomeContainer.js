/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useCallback } from 'react';
import { uniqBy } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

import { getProducts, sendOrder, addNotification } from 'actions';
import Fetching from 'components/Fetching';
import ProductListContainer from 'modules/home/containers/ProductListContainer';
import {
  AppHeaderComponent,
  AppFooterComponent,
  StepCartComponent,
  StepFinishComponent,
} from 'modules/home/components';

const style = {
  productAppContent: {
    background: '#F8F9FA',
    height: 'inherit',
    padding: '1.5rem',
    overflow: 'auto',
    width: '100%',
  },
};

const HomeContainer = () => {
  const [checkedList, useCheckedList] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const dispatch = useDispatch();
  const getProductsAction = () => dispatch(getProducts());
  const sendOrderAction = (data) => dispatch(sendOrder(data));
  const addNotificationAction = (data) => dispatch(addNotification(data));

  useEffect(() => {
    getProductsAction();
  }, []);

  const getProductList = () => {
    const { data, loaded, loading } = useSelector((state) => state.get.getProductList);
    const productList = loaded && data.data.data;
    return { productList, loaded, loading };
  };

  const { loading: isOrderLoading } = useSelector((state) => state.post.isSendingOrder);
  const { productList, loaded, loading } = getProductList();

  const handleSelectedProduct = useCallback(
    (product, parentProduct) => (event) => {
      if (event.target.checked) {
        const isParentProduct = parentProduct !== undefined;
        Object.assign(product, { quantity: 1 });
        if (isParentProduct) Object.assign(parentProduct, { quantity: 1 });

        const productSelected = isParentProduct
          ? checkedList.some((p) => p._id === parentProduct._id)
            ? [{ ...product, parentId: parentProduct._id }]
            : [{ ...parentProduct }, { ...product, parentId: parentProduct._id }]
          : [{ ...product }];

        useCheckedList([...checkedList, ...productSelected]);
      } else {
        useCheckedList(checkedList.filter((item) => item._id !== product._id));
      }
    },
    [checkedList],
  );

  const handleSelectedProductList = (event) => {
    const uniqueProducts = uniqBy([...checkedList, ...productList], '_id');
    const uniqueProductsWithQuantity = [];

    uniqueProducts.forEach((productItem) => {
      const productItemCopy = { ...productItem };
      if (productItemCopy.quantity === undefined) productItemCopy.quantity = 1;
      delete productItemCopy.additional;
      uniqueProductsWithQuantity.push(productItemCopy);
    });

    useCheckedList(event.target.checked ? [...uniqueProductsWithQuantity] : []);
  };

  const handleQuantityAdd = (product) => (event) => {
    event.stopPropagation();
    const currentItem = checkedList.find((item) => item._id === product._id);
    if (currentItem !== undefined) {
      currentItem.quantity += 1;
      useCheckedList([...checkedList]);
    } else {
      useCheckedList([...checkedList, { ...product, quantity: 2 }]);
    }
  };

  const handleQuantityRemove = useCallback(
    (productId) => (event) => {
      event.stopPropagation();
      const currentItem = checkedList.find((item) => item._id === productId);
      if (currentItem && currentItem.quantity > 1) {
        currentItem.quantity -= 1;
        useCheckedList([...checkedList]);
      }
    },
    [checkedList],
  );

  const handleIsEpandedAll = useCallback(
    () => () => {
      setExpanded(!expanded);
    },
    [expanded],
  );

  const handleIsEpanded = useCallback(
    (currentId) => (event, isExpanded) => {
      setExpanded(isExpanded ? currentId : false);
    },
    [expanded],
  );

  const total =
    checkedList.length &&
    checkedList.reduce((acc, item) => Number(acc) + Number(item.price.slice(1)) * item.quantity, 0);

  const productListContainer = (productTitle) => (
    <ProductListContainer
      productTitle={productTitle}
      data={{ loaded, productList }}
      checkedList={checkedList}
      expanded={expanded}
      handleIsEpanded={handleIsEpanded}
      handleQuantityRemove={handleQuantityRemove}
      handleQuantityAdd={handleQuantityAdd}
      handleSelectedProduct={handleSelectedProduct}
    />
  );

  const stepCartComponent = (productTitle) => (
    <>
      <ProductListContainer
        productTitle={productTitle}
        data={{
          loaded,
          productList:
            loaded && productList.filter((pl) => checkedList.some((cl) => pl._id === cl._id)),
        }}
        checkedList={checkedList}
        expanded={expanded}
        handleIsEpanded={handleIsEpanded}
        handleQuantityRemove={handleQuantityRemove}
        handleQuantityAdd={handleQuantityAdd}
        handleSelectedProduct={handleSelectedProduct}
      />
      {+total !== 0 && <StepCartComponent total={total} />}
    </>
  );

  const getStepContent = (stepIndex) => {
    const stepContent = [
      [productListContainer('Product List'), 'Buy'],
      [stepCartComponent('Product Cart'), 'Confirm'],
      [<StepFinishComponent />, 'Finish'],
    ];
    return {
      stepContent: (position) => stepContent[stepIndex][0 || position],
      stepContentLength: stepContent.length - 1,
    };
  };

  const { stepContent, stepContentLength } = getStepContent(activeStep);

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, [activeStep]);

  const handlePrev = useCallback(() => {
    setActiveStep((prevActiveStep) => (activeStep === stepContentLength ? 0 : prevActiveStep - 1));
  }, [activeStep, stepContentLength]);

  const handleOrder = useCallback(() => {
    console.log(checkedList);
    const data = {
      order: [...checkedList],
      total,
      currency: 'USD',
      symbol: '$',
    };
    sendOrderAction(data).then((res) => {
      if (!res.error) {
        setActiveStep(stepContentLength);
        useCheckedList([]);
        addNotificationAction({
          type: 'info',
          text: `
            Your order has been sent successfully. Total amount: $ ${total.toFixed(2)}
          `,
        });
      } else addNotificationAction({ type: 'error', text: 'error req...' });
    });
  }, [activeStep, checkedList, addNotification]);

  const isDisableHeaderButtons =
    (loaded && productList.length === 0) ||
    !productList ||
    (activeStep > 0 && +total === 0) ||
    isOrderLoading;

  console.log('checkedList', checkedList);

  return (
    <React.Fragment>
      <AppHeaderComponent
        total={total.toFixed(2)}
        disabled={isDisableHeaderButtons}
        activeStep={activeStep}
        handlePrev={handlePrev}
        handleIsEpanded={handleIsEpandedAll()}
        handleSelectedProductList={handleSelectedProductList}
        isOrderLoading={isOrderLoading}
      />

      <Fetching isFetching={loading || isOrderLoading} bg={isOrderLoading} isHeight>
        <section style={style.productAppContent}>{stepContent(0)}</section>
      </Fetching>

      <AppFooterComponent
        disabled={checkedList.length === 0 || activeStep === stepContentLength || isOrderLoading}
        handleNext={activeStep === 1 ? handleOrder : handleNext}
        buttonName={stepContent(1)}
      />
    </React.Fragment>
  );
};

export default HomeContainer;

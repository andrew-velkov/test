import * as type from 'constants/products';

export const getProducts = () => ({
  types: [type.GET_PRODUCTS_REQUEST, type.GET_PRODUCTS_SUCCESS, type.GET_PRODUCTS_FAILURE],
  payload: {
    request: {
      url: '/products',
      method: 'GET',
    },
  },
});

export const sendOrder = (data) => ({
  types: [type.SEND_ORDER_REQUEST, type.SEND_ORDER_SUCCESS, type.SEND_ORDER_FAILURE],
  payload: {
    request: {
      url: '/products/order',
      method: 'POST',
      data,
    },
  },
});

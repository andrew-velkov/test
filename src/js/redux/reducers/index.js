import { combineReducers } from 'redux';

// other
import notification from './notification';
import products from './products';

const reducers = combineReducers({
  get: combineReducers({
    notifications: notification('notification'),
    getProductList: products('getProductList'),
  }),
  post: combineReducers({
    isSendingOrder: products('sendOrder'),
  }),
});

export default reducers;

import { createStore, applyMiddleware, compose } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import API from 'config/api';
import reducer from './reducers';

const client = axios.create({
  baseURL: API.baseUrl,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiMiddlewareDefault = [axiosMiddleware(client)];

const store = createStore(
  reducer,
  compose(
    applyMiddleware(...apiMiddlewareDefault),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default store;

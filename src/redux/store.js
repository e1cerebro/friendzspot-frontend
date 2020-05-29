import { createStore, applyMiddleware, compose } from 'redux';
import { combinedReducers } from './reducers/index';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
export const store = createStore(
  combinedReducers,
  compose(applyMiddleware(...middlewares), devTools)
);

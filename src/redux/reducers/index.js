import { combineReducers } from 'redux';
import appReducer from './app';

export const combinedReducers = combineReducers({
  app: appReducer,
});

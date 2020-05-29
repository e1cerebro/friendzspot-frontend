import { combineReducers } from 'redux';
import appReducer from './app';
import chatReducer from './chat';

export const combinedReducers = combineReducers({
  app: appReducer,
  chat: chatReducer,
});

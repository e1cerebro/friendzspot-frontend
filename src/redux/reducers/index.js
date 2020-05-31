import { combineReducers } from 'redux';
import appReducer from './app';
import chatReducer from './chat';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['chat', 'app'],
};

export const combinedReducers = persistReducer(
  persistConfig,
  combineReducers({
    app: appReducer,
    chat: chatReducer,
  })
);

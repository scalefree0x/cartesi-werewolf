import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './reducers';

// Configure store with rootReducer and middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;

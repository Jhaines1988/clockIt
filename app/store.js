import { configureStore } from '@reduxjs/toolkit';
import userHomeScreenInformationReducer from './userHomeScreenInformation.js';
import userHistoryReducer from './userHistory';
export default configureStore({
  reducer: {
    userHomeScreen: userHomeScreenInformationReducer,
    userHistory: userHistoryReducer,
  },
});

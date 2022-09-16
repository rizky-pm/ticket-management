import { configureStore } from '@reduxjs/toolkit';

import styleReducer from '../features/styleSlice';

const store = configureStore({
  reducer: {
    style: styleReducer,
  },
});

export default store;

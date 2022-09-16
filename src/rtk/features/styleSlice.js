import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bodyOverflowHidden: false,
};

const sytleSlice = createSlice({
  name: 'style',
  initialState,
  reducers: {
    toggleOverflow: (state) => {
      state.bodyOverflowHidden = !state.bodyOverflowHidden;
    },
  },
});

export default sytleSlice.reducer;
export const { toggleOverflow } = sytleSlice.actions;

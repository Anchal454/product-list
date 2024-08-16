import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products = action.payload;
    },
    getProduct:(state, action) => {
      return state.products
    }
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItem: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      if (!action.payload) return;
      state.cartItem = [...state.cartItem, action.payload];
    },
    removeFromCart(state, action) {
      if (!action.payload) return;
      state.cartItem = state.cartItem.filter((e) => e !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

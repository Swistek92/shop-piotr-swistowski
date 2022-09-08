import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [],
  selectItem: '',
};

const refreshLocalStorage = (state) =>
  localStorage.setItem('cart', JSON.stringify(state.cart));

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      refreshLocalStorage(state);
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
      refreshLocalStorage(state);
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = removeItem;
      refreshLocalStorage(state);
    },
    selectItem(state, action) {
      state.selectItem = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, selectItem } = cartSlice.actions;

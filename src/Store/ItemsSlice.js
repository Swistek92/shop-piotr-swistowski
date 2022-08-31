import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  currency: 'USD',
  categories: ['all'],
  currentCategory: 'all',
};

const avilableCurrency = ['USD', 'GBP', 'AUD', 'JPY', 'RUB'];

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addCategories(state, action) {
      state.categories = action.payload;
    },
    addProducts(state, action) {
      state.products = action.payload;
    },
    changeCurrency(state, action) {
      if (!avilableCurrency.includes(action.payload)) return;
      state.currency = action.payload;
    },
    changeCategory(state, action) {
      state.currentCategory = action.payload;
    },
  },
});

export const { changeCurrency, addProducts, addCategories, changeCategory } =
  itemsSlice.actions;

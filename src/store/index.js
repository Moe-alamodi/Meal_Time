import { configureStore, createSlice } from "@reduxjs/toolkit";
// Using reducx-toolkit to manage the satet

const initialCart = {
  items: [],
  totalAmount: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducer: {
    addItem(state, action) {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingCartItemIndex !== -1) {
        state.items[existingCartItemIndex].amount += action.payload.amount;
        state.totalAmount +=
          state.items[existingCartItemIndex].price * action.payload.amount;
      } else {
        state.items = [...state.item, action.payload];
        state.totalAmount += action.payload.price;
      }
    },
    increaseItemAmount(state, action) {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items[existingCartItemIndex].amount++;
      state.totalAmount += state.items[existingCartItemIndex].price;
    },
    removeItem(state, action) {
      const desiredItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.items[desiredItemIndex].amount === 1) {
        state.items.filter((item) => item.id !== action.payload);
      } else {
        state.items[desiredItemIndex].amount--;
      }
      state.totalAmount -= state.items[desiredItemIndex].price;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});
export const cartActions = cartSlice.actions;
export const store = configureStore({ reducer: { cart: cartSlice.reducer } });

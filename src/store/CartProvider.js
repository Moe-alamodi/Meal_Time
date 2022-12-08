import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = { items: [], totalAmount: 0 };
const ADD_CART_ITEM = "ADD";
const REMOVE_CART_ITEM = "REMOVE";
const EMPTY_CART = "EMPTY";

const cartReducer = (state, action) => {
  switch (action.type) {
    // Adding an item
    case ADD_CART_ITEM:
      // Update the amount on every click
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;

      // Updating items in the cart to aviod duplications.
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        // concat is used here to return a new array instead of mutating the original state array
        updatedItems = state.items.concat(action.payload);
      }

      return { items: updatedItems, totalAmount: updatedTotalAmount };
    // removing an item
    case REMOVE_CART_ITEM:
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const existingItem = state.items[existingItemIndex];
      // Update the total amount
      const updatedTotalAmountOnRemove = state.totalAmount - existingItem.price;

      let updatedItemsOnRemove;
      if (existingItem?.amount === 1) {
        updatedItemsOnRemove = state.items.filter(
          (item) => item.id !== action.payload
        );
      } else {
        const updatedItemOnRemove = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItemsOnRemove = [...state.items];
        updatedItemsOnRemove[existingItemIndex] = updatedItemOnRemove;
      }
      return {
        items: updatedItemsOnRemove,
        totalAmount: updatedTotalAmountOnRemove,
      };
    case EMPTY_CART:
      return defaultCartState;

    default:
      return defaultCartState;
  }
};
const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: ADD_CART_ITEM, payload: item });
  };
  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: REMOVE_CART_ITEM, payload: id });
  };
  const emptyCartHandler = () => {
    dispatchCartAction({ type: EMPTY_CART });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart: emptyCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;

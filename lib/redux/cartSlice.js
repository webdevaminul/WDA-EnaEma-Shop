import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + quantity, product.stock);
      } else {
        state.cartItems.push({ ...product, quantity });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity, stock } = action.payload;
      const item = state.cartItems.find((item) => item._id === productId);
      if (item) {
        item.quantity = Math.min(quantity, stock);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

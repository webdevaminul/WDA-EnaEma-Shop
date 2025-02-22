import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  userCartLoaded: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, name, image, price, quantity, stock } = action.payload;
      const existingItem = state.cartItems.find((item) => item.productId === productId);
      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + quantity, stock);
      } else {
        state.cartItems.push({ productId, name, image, price, quantity, stock });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.productId !== action.payload);
    },

    setCartFromDB: (state, action) => {
      if (!state.userCartLoaded) {
        state.cartItems = action.payload;
        state.userCartLoaded = true;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.userCartLoaded = false;
    },
  },
});

export const { addToCart, removeFromCart, setCartFromDB, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const syncCartWithDB = (id, cartItems) => async () => {
  try {
    const mergedCart = cartItems.reduce((acc, item) => {
      const existingItem = acc.find((p) => p.productId === item.productId);
      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + item.quantity, item.stock);
      } else {
        acc.push({
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          stock: item.stock,
        });
      }
      return acc;
    }, []);

    await axios.put(`/api/users/${id}/post`, { cartItems: mergedCart });
  } catch (error) {
    console.error("Error syncing cart with DB:", error);
  }
};

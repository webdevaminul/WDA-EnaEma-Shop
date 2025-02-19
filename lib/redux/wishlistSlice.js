import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  wishlistItems: [],
  userWishlistLoaded: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const { _id, name, price, image } = action.payload;
      const exists = state.wishlistItems.some((item) => item._id === _id);
      if (!exists) {
        state.wishlistItems.push({ _id, name, price, image });
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter((item) => item._id !== action.payload);
    },
    setWishlistFromDB: (state, action) => {
      if (!state.userWishlistLoaded) {
        state.wishlistItems = action.payload;
        state.userWishlistLoaded = true;
      }
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
      state.userWishlistLoaded = false;
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlistFromDB, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;

export const syncWishlistWithDB = (id, wishlistItems) => async () => {
  try {
    await axios.put(`/api/users/${id}/post`, { wishlistItems });
  } catch (error) {
    console.error("Error syncing wishlist with DB:", error);
  }
};

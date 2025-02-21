"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist, syncWishlistWithDB } from "@/lib/redux/wishlistSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function WishlistToggle({ product }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const [loading, setLoading] = useState(false);

  const isInWishlist = wishlist.some((item) => item._id === product._id);

  const handleWishlistToggle = () => {
    if (!product) return;
    setLoading(true);

    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }

    if (user && user._id) {
      const updatedWishlist = isInWishlist
        ? wishlist.filter((item) => item._id !== product._id)
        : [...wishlist, product];

      dispatch(syncWishlistWithDB(user._id, updatedWishlist));
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleWishlistToggle}
      disabled={loading}
      className={`p-2 text-lg md:text-xl flex items-center aspect-square 
        ${isInWishlist ? "text-red-500" : "text-gray-600"} 
        hover:bg-emerald-500 rounded-full gap-2 transition hover:text-white`}
    >
      {isInWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
    </button>
  );
}

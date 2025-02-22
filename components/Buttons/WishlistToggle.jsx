"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist, syncWishlistWithDB } from "@/lib/redux/wishlistSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function WishlistToggle({ product }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const [loading, setLoading] = useState(false);

  const isInWishlist = wishlistItems.some((item) => item.productId === product._id);

  const handleWishlistToggle = () => {
    if (!product) return;
    setLoading(true);

    const wishlistItem = {
      productId: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
    };

    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(wishlistItem));
    }

    if (user && user._id) {
      const updatedWishlist = isInWishlist
        ? wishlistItems.filter((item) => item.productId !== product._id)
        : [...wishlistItems, wishlistItem];

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

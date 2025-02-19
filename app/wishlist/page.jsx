"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromWishlist,
  setWishlistFromDB,
  syncWishlistWithDB,
} from "@/lib/redux/wishlistSlice";
import axios from "axios";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const { wishlistItems, userWishlistLoaded } = useSelector((state) => state.wishlist);
  const user = useSelector((state) => state.auth.user);
  const id = user?._id;

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user && user._id && !userWishlistLoaded) {
        try {
          const { data } = await axios.get(`/api/users/${id}/get`);
          if (data.success) {
            dispatch(setWishlistFromDB(data.wishlistItems));
          }
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      }
    };
    fetchWishlist();
  }, [user, userWishlistLoaded, dispatch]);

  const handleRemove = async (id) => {
    dispatch(removeFromWishlist(id));

    if (user && user._id) {
      const updatedWishlist = wishlistItems.filter((item) => item._id !== id);
      dispatch(syncWishlistWithDB(user._id, updatedWishlist));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your wishlist is empty.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-3">{item.name}</td>
                <td className="p-3">${item.price}</td>
                <td className="p-3">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

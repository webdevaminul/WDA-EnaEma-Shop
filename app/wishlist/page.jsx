"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import {
  removeFromWishlist,
  setWishlistFromDB,
  syncWishlistWithDB,
} from "@/lib/redux/wishlistSlice";
import TitleLeft from "@/components/Titles/TitleLeft";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { wishlistItems, userWishlistLoaded } = useSelector((state) => state.wishlist);
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
  }, [user, userWishlistLoaded, dispatch, id]);

  const handleRemove = async (productId) => {
    dispatch(removeFromWishlist(productId));

    if (user && user._id) {
      const updatedWishlist = wishlistItems.filter((item) => item.productId !== productId);
      dispatch(syncWishlistWithDB(user._id, updatedWishlist));
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <TitleLeft title={"Wishlist"} subTitle={"Your favorite products are saved here!"} />

      {wishlistItems.length === 0 ? (
        <p className="text-gray-500 text-center h-96 mt-5">Your wishlist is empty.</p>
      ) : (
        <div className="min-h-96 mt-5 overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {wishlistItems.map((item) => (
                <tr key={item.productId} className="border-b text-gray-600">
                  <td className="pl-3">
                    <figure className="h-14 aspect-square rounded">
                      <img
                        src={item.image}
                        alt="Product"
                        className="w-full h-full object-cover object-center"
                      />
                    </figure>
                  </td>
                  <td className="p-3 text-nowrap">{item.name}</td>
                  <td className="p-3 text-nowrap">${item.price}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      className="w-9 h-9 aspect-square rounded-full p-1 flex items-center justify-center hover:bg-red-500 text-gray-600 hover:text-white text-lg transition"
                      onClick={() => handleRemove(item.productId)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

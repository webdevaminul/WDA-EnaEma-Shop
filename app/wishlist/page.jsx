"use client";

import { removeFromWishlist } from "@/lib/redux/wishlistSlice";
import { useSelector, useDispatch } from "react-redux";

export default function page() {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Wishlist</h1>

      {wishlist.length === 0 ? (
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
            {wishlist.map((item) => (
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

"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, setCartFromDB } from "@/lib/redux/cartSlice";
import { syncCartWithDB } from "@/lib/redux/cartSlice";
import axios from "axios";

export default function CartPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userCartLoaded = useSelector((state) => state.cart.userCartLoaded);

  const id = user?._id;

  useEffect(() => {
    const fetchCartFromDB = async () => {
      if (user && user._id && !userCartLoaded) {
        try {
          const { data } = await axios.get(`/api/users/${id}/get`);
          dispatch(setCartFromDB(data.cartItems));
        } catch (error) {
          console.error("Error fetching cart from DB:", error);
        }
      }
    };
    fetchCartFromDB();
  }, [user, dispatch, userCartLoaded]);

  const handleQuantityChange = (productId, quantity, stock) => {
    dispatch(updateQuantity({ productId, quantity, stock }));

    if (user && user._id) {
      const updatedCart = cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );

      dispatch(syncCartWithDB(user._id, updatedCart));
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));

    if (user && user._id) {
      const updatedCart = cartItems.filter((item) => item.productId !== productId);
      dispatch(syncCartWithDB(user._id, updatedCart));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.productId} className="border-b">
                <td className="p-3">{item.name}</td>
                <td className="p-3">${item.price}</td>
                <td className="p-3 flex gap-2">
                  <button
                    className="bg-gray-800 px-3 py-1 rounded text-white"
                    onClick={() =>
                      handleQuantityChange(
                        item.productId,
                        Math.max(item.quantity - 1, 1),
                        item.stock
                      )
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="bg-gray-800 px-3 py-1 rounded text-white"
                    onClick={() =>
                      handleQuantityChange(
                        item.productId,
                        Math.min(item.quantity + 1, item.stock),
                        item.stock
                      )
                    }
                  >
                    +
                  </button>
                </td>
                <td className="p-3">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="p-3">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleRemove(item.productId)}
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

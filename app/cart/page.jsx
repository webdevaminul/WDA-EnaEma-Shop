"use client";

import { removeFromCart, updateQuantity } from "@/lib/redux/cartSlice";
import { useSelector, useDispatch } from "react-redux";

export default function page() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity, stock) => {
    dispatch(updateQuantity({ productId: id, quantity, stock }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
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
              <tr key={item._id} className="border-b">
                <td className="p-3">{item.name}</td>
                <td className="p-3">${item.price}</td>
                <td className="p-3 flex gap-2">
                  <button
                    className="bg-gray-800 px-3 py-1 rounded"
                    onClick={() =>
                      handleQuantityChange(item._id, Math.max(item.quantity - 1, 1), item.stock)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="bg-gray-800 px-3 py-1 rounded"
                    onClick={() =>
                      handleQuantityChange(
                        item._id,
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

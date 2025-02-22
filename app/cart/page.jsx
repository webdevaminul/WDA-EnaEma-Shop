"use client";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { removeFromCart, setCartFromDB } from "@/lib/redux/cartSlice";
import { syncCartWithDB } from "@/lib/redux/cartSlice";
import TitleLeft from "@/components/Titles/TitleLeft";

export default function CartPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems, userCartLoaded } = useSelector((state) => state.cart);
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

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));

    if (user && user._id) {
      const updatedCart = cartItems.filter((item) => item.productId !== productId);
      dispatch(syncCartWithDB(user._id, updatedCart));
    }
  };
  const grandTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleOrderNow = () => {
    console.log("Proceed to order with cart items:", cartItems);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <TitleLeft title={"Shopping Cart"} subTitle={"Your selected items are ready for purchase!"} />

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center h-96 mt-5">Your cart is empty.</p>
      ) : (
        <div className="min-h-96 mt-5 overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
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
                  <td className="p-3 flex items-center flex-nowrap gap-2">{item.quantity}</td>
                  <td className="p-3 text-nowrap">${(item.price * item.quantity).toFixed(2)}</td>
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

          <div className="flex justify-end items-center mt-6 pt-4">
            <p className="text-lg text-emerald-600">Grand Total: ${grandTotal.toFixed(2)}</p>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleOrderNow}
              className="my-2 bg-emerald-600 flex items-center gap-2 text-white hover:bg-emerald-500 font-semibold py-3 px-6 rounded transition-all duration-300 transform animate-fade-in"
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

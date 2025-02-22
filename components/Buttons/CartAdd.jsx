"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, syncCartWithDB } from "@/lib/redux/cartSlice";
import { BiCartAdd } from "react-icons/bi";

export default function CartAdd({ product, quantity = 1 }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    if (!product || product.stock === 0) return;

    setLoading(true);

    const cartItem = {
      productId: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
      stock: product.stock,
    };

    dispatch(addToCart(cartItem));

    if (user && user._id) {
      const updatedCart = [...cartItems, cartItem];
      dispatch(syncCartWithDB(user._id, updatedCart));
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading || product.stock === 0}
      className={`p-2 text-lg md:text-xl flex items-center aspect-square 
        ${loading ? "bg-gray-300" : "hover:bg-emerald-500"} 
        rounded-full gap-2 transition text-gray-600 hover:text-white`}
    >
      <BiCartAdd />
    </button>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addToCart, syncCartWithDB } from "@/lib/redux/cartSlice";
import { addToWishlist, removeFromWishlist, syncWishlistWithDB } from "@/lib/redux/wishlistSlice";

export default function ProductDetails({ params }) {
  const { id } = React.use(params);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/details/${id}`);
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
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
        if (user && user._id) {
          dispatch(syncCartWithDB(user._id, updatedCart));
        }
      }
    }
  };

  const handleWishlist = () => {
    if (wishlist.some((item) => item._id === product._id)) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }

    if (user && user._id) {
      const updatedWishlist = wishlist.some((item) => item._id === product._id)
        ? wishlist.filter((item) => item._id !== product._id)
        : [...wishlist, product];

      dispatch(syncWishlistWithDB(user._id, updatedWishlist));
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg"
        />
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="mt-4 text-lg font-semibold">Price: ${product.price}</p>
          <p
            className={`mt-2 font-semibold ${
              product.stock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? "Available" : "Unavailable"}
          </p>

          <div className="mt-4 flex gap-3">
            <button
              className="bg-gray-800 px-3 py-1 rounded"
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="bg-gray-800 px-3 py-1 rounded"
              onClick={() => setQuantity((prev) => Math.min(prev + 1, product.stock))}
            >
              +
            </button>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              Add to Cart
            </button>
            <button
              className={`px-4 py-2 rounded ${
                wishlist.some((item) => item._id === product._id)
                  ? "bg-gray-500"
                  : "bg-yellow-500 text-white"
              }`}
              onClick={handleWishlist}
            >
              {wishlist.some((item) => item._id === product._id)
                ? "Already in Wishlist"
                : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

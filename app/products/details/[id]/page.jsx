"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductDetails({ params }) {
  // Using React.use() to unwrap the params object
  const { id } = React.use(params);
  console.log(id);
  const [product, setProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/details/${id}`);
        if (data.success) {
          setProduct(data.product);
        }
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

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
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => router.push(`/cart`)}
            >
              Add to Cart
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => router.push(`/wishlist`)}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

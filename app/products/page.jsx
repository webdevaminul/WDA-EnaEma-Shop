"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products/list");
        setProducts(data?.products);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            href={`/products/details/${product._id}`}
            key={product._id}
            className="border rounded-lg p-4 shadow-lg bg-gray-500"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">Price: ${product.price}</p>
            <p
              className={`mt-2 font-semibold ${
                product.stock > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {product.stock > 0 ? "Available" : "Unavailable"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

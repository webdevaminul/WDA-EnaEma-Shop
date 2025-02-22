"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import TitleLeft from "@/components/Titles/TitleLeft";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products/list/new");
        setProducts(data.products);
      } catch (error) {
        setError("Failed to load new arrivals");
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto my-5 p-4 md:my-10 lg:my-20">
        <TitleLeft
          title={"New Arrivals"}
          subTitle={"Shop online for new arrivals and get free shipping"}
        />
        <p className="text-center text-gray-600 col-span-12 h-80">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto my-5 p-4 md:my-10 lg:my-20">
        <TitleLeft
          title={"New Arrivals"}
          subTitle={"Shop online for new arrivals and get free shipping"}
        />
        <p className="text-center text-gray-600 col-span-12">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-5 p-4 md:my-10 lg:my-20">
      <TitleLeft
        title={"New Arrivals"}
        subTitle={"Shop online for new arrivals and get free shipping"}
      />
      <div className="mt-5 grid grid-cols-12 gap-6">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product._id} product={product} />)
        ) : (
          <p className="text-center text-gray-600 col-span-12">No new arrivals available</p>
        )}
      </div>
    </div>
  );
}

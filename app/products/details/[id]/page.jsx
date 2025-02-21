"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import WishlistToggle from "@/components/Buttons/WishlistToggle";
import CartAdd from "@/components/Buttons/CartAdd";
import PrimaryBtn from "@/components/Buttons/PrimaryBtn";

export default function ProductDetails() {
  const searchParams = useSearchParams();

  const product = {
    _id: searchParams.get("id"),
    name: searchParams.get("name"),
    price: parseFloat(searchParams.get("price")),
    image: searchParams.get("image"),
    description: searchParams.get("description"),
    stock: parseInt(searchParams.get("stock"), 10),
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in-right">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <figure className="h-96">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </figure>
        <div>
          <h1 className="text-2xl font-medium text-gray-600">{product.name}</h1>
          <p className="mt-4 text-lg font-semibold text-gray-600">Price: ${product.price}</p>
          <p
            className={`mt-2 font-semibold ${
              product.stock > 0 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? "Available" : "Unavailable"}
          </p>
          <p className="text-gray-600 mt-4">{product.description}</p>

          <div className="mt-4 flex items-center gap-3">
            <CartAdd product={product} />
            <WishlistToggle product={product} />
          </div>

          <div className="mt-4 flex gap-3">
            {product.stock > 0 ? (
              <Link
                href={{
                  pathname: `/products/details/${product._id}/order`,
                  query: {
                    id: product._id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    stock: product.stock,
                  },
                }}
              >
                <PrimaryBtn label={"Order Now"} />
              </Link>
            ) : (
              <button
                disabled
                className="bg-gray-300 text-gray-600 cursor-not-allowed px-4 py-2 rounded"
              >
                Out of Stock
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

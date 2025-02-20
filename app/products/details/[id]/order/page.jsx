"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function OrderPage() {
  const searchParams = useSearchParams();
  const product = {
    id: searchParams.get("id"),
    name: searchParams.get("name"),
    image: searchParams.get("image"),
    price: parseFloat(searchParams.get("price")),
    quantity: parseInt(searchParams.get("quantity")),
  };
  const { user } = useSelector((state) => state.auth);

  const router = useRouter();
  const [address, setAddress] = useState("");

  if (!user) {
    router.push("/login");
  }

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("Please enter your billing address.");
      return;
    }
    if (!confirm("Are you sure you want to order this product?")) return;

    const orderData = {
      userId: user._id,
      products: [
        {
          productId: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: product.quantity,
        },
      ],
      totalAmount: product.price * product.quantity,
      address,
      paymentMethod: "Cash on Delivery",
      status: "Pending",
    };
    console.log("orderData", orderData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Review Your Order</h1>

      {/* Order Summary */}
      <div className="mb-6 border p-4 rounded-md shadow-sm">
        <h2 className="text-lg font-medium mb-2">Order Summary</h2>
        <div className="flex items-center space-x-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-md"
          />
          <div>
            <p className="text-lg font-semibold">{product.name}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
          </div>
        </div>
        <p className="text-right font-semibold mt-3">Total: ${product.price * product.quantity}</p>
      </div>

      {/* Shipping Address */}
      <div className="border p-4 rounded-md shadow-sm">
        <h2 className="text-lg font-medium mb-2">Shipping Address</h2>
        <textarea
          className="w-full border rounded p-2"
          rows="3"
          placeholder="Enter your address..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* Payment Method */}
      <div className="mt-6 border p-4 rounded-md shadow-sm">
        <h2 className="text-lg font-medium mb-2">Payment Method</h2>
        <p>Cash on Delivery</p>
      </div>

      {/* Place Order Button */}
      <button
        className="w-full bg-blue-600 text-white py-2 mt-6 rounded-md hover:bg-blue-700"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
}

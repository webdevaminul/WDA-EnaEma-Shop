"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";
import TitleLeft from "@/components/Titles/TitleLeft";

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
  const [address, setAddress] = useState(user.address);

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

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
          quantity: 1,
        },
      ],
      totalAmount: product.price * product.quantity,
      address,
      paymentMethod: "Cash on Delivery",
      status: "Pending",
    };

    try {
      const { data } = await axios.post("/api/orders/create", orderData);

      if (data.success) {
        alert("Order placed successfully!");
        router.push("/orders-history");
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Error placing order.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-96">
      <TitleLeft
        title={"Review Your Order"}
        subTitle={"Please confirm your order details before proceeding."}
      />

      {/* Order Summary */}
      <div className="mt-10 mb-5 border p-4 rounded-md text-gray-600">
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
      <div className="text-gray-600">
        <h2 className="text-lg font-medium mb-2">Shipping Address</h2>
        <textarea
          className="w-full border rounded p-4 outline-gray-600"
          rows="3"
          placeholder="Enter your address..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* Payment Method */}
      <div className="my-5 border p-4 rounded-md text-gray-600">
        <h2 className="text-lg font-medium mb-2">Payment Method</h2>
        <p>Cash on Delivery</p>
      </div>

      {/* Place Order Button */}
      <div className="flex items-center justify-end mt-8">
        <button
          className="my-2 bg-emerald-600 flex items-center gap-2 text-white hover:bg-emerald-500 font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 animate-fade-in"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

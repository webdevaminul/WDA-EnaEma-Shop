"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";
import TitleLeft from "@/components/Titles/TitleLeft";

export default function OrderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(user?.address || "");

  const urlProduct = {
    id: searchParams.get("id"),
    name: searchParams.get("name"),
    image: searchParams.get("image"),
    price: parseFloat(searchParams.get("price")),
    quantity: parseInt(searchParams.get("quantity") || 1),
  };

  const orderProducts = urlProduct.id ? [urlProduct] : cartItems;

  useEffect(() => {
    if (!user) router.push("/signin");
    if (orderProducts.length === 0) router.push("/");
  }, [user, orderProducts, router]);

  const handlePlaceOrder = async () => {
    if (!address.trim()) return alert("Please enter your address.");
    if (!confirm("Confirm order?")) return;

    const orderData = {
      userId: user._id,
      products: orderProducts.map((item) => ({
        productId: item.productId || item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: orderProducts.reduce((total, item) => total + item.price * item.quantity, 0),
      address,
      paymentMethod: "Cash on Delivery",
      status: "Pending",
    };

    try {
      const { data } = await axios.post("/api/orders/create", orderData);
      if (data.success) {
        alert("Order placed!");
        router.push("/orders-history");
      } else {
        alert("Order failed.");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Error placing order.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-96">
      <TitleLeft title={"Review Your Order"} subTitle={"Confirm your order details"} />

      {/* Order Summary */}
      <div className="mt-10 mb-5 border p-4 rounded-md text-gray-600">
        <h2 className="text-lg font-medium mb-2">Order Summary</h2>
        {orderProducts.map((product) => (
          <div key={product.id || product.productId} className="flex items-center space-x-4 mb-4">
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
        ))}
        <p className="text-right font-semibold mt-3">
          Total: $
          {orderProducts.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
        </p>
      </div>

      {/* Rest of the component remains the same */}
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

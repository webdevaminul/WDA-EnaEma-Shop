"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function OrderHistory() {
  const user = useSelector((state) => state.auth.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = user?._id;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const { data } = await axios.get(`/api/orders/get/${userId}`);
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return <p className="text-center text-red-500">Please log in to view your orders.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Hello, {user.name}! Your Order History</h1>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-800">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Total Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Payment</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="border p-2">{order._id.slice(-6)}</td>
                <td className="border p-2">${order.totalAmount.toFixed(2)}</td>
                <td className="border p-2">{order.status}</td>
                <td className="border p-2">{order.paymentMethod}</td>
                <td className="border p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

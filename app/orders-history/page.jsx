"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import TitleLeft from "@/components/Titles/TitleLeft";

export default function OrderHistory() {
  const { user } = useSelector((state) => state.auth);
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
    return <p className="text-center text-gray-600 h-96">Please log in to view your orders.</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-96">
      <div className="mb-10">
        <TitleLeft
          title={"Orders History"}
          subTitle={"All your previous orders are listed below."}
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-600 h-96">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600 h-96">No orders found.</p>
      ) : (
        <div className="min-h-96 mt-5 overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Products</th>
                <th className="p-3 text-left">Total Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Payment</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b text-gray-600">
                  <td className="p-3 text-nowrap">{order._id.slice(-6)}</td>
                  <td className="p-3">
                    <ul>
                      {order.products.map((product, index) => (
                        <li key={index} className="mb-2 text-nowrap">
                          <span className="font-semibold">{product.name}</span> -{" "}
                          <span>Qty: {product.quantity}</span> -{" "}
                          <span>Price: ${product.price.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 text-nowrap">${order.totalAmount.toFixed(2)}</td>
                  <td className="p-3 text-nowrap">{order.status}</td>
                  <td className="p-3 text-nowrap">{order.paymentMethod}</td>
                  <td className="p-3 text-nowrap">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

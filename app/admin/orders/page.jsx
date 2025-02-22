"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import TitleLeft from "@/components/Titles/TitleLeft";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/api/orders/get/list");
        if (data.success) setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/admin/update/${orderId}`, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order))
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div>
      <TitleLeft title="Manage Orders" subTitle="View, update or manage customer orders." />
      {loading ? (
        <p className="text-center text-gray-600 h-96">Loading orders...</p>
      ) : (
        <div className="min-h-96 mt-8 overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Products</th>
                <th className="p-3 text-left">Total Amount</th>
                <th className="p-3 text-left">Payment Method</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-600">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="border-b text-gray-600">
                    <td className="p-3 text-nowrap">{order._id.slice(-6)}</td>
                    <td className="p-3">
                      <ul>
                        {order.products.map((product, index) => (
                          <li key={index} className="mb-2 flex items-center">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded mr-3"
                            />
                            <div>
                              <p className="text-gray-800 text-nowrap">{product.name}</p>
                              <p>Qty: {product.quantity}</p>
                              <p>Price: ${product.price.toFixed(2)}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-3 text-nowrap">${order.totalAmount.toFixed(2)}</td>
                    <td className="p-3 text-nowrap">{order.paymentMethod}</td>
                    <td className="p-3 text-nowrap">
                      <select
                        className="border p-2 rounded-md"
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      >
                        {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(
                          (status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          )
                        )}
                      </select>
                    </td>
                    <td className="p-3 text-nowrap">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

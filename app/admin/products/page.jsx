"use client";

import { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdVisibility } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import TableButton from "@/components/Table/TableButton";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products/admin/list");
        setProducts(data?.products);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/api/products/admin/delete/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Product Management</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-400 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-500">
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">${product.price}</td>
                    <td className="p-3">{product.stock}</td>
                    <td className="p-3 flex gap-2">
                      <Link href={`/products/details/${product._id}`}>
                        <TableButton variant="outline" size="sm">
                          <MdVisibility />
                        </TableButton>
                      </Link>
                      <Link href={`/admin/products/edit/${product._id}`}>
                        <TableButton variant="outline" size="sm" className="text-blue-600">
                          <MdEdit />
                        </TableButton>
                      </Link>
                      <TableButton
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleDelete(product._id)}
                      >
                        <MdDelete />
                      </TableButton>
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

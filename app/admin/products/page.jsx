"use client";

import { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdVisibility } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import TitleLeft from "@/components/Titles/TitleLeft";

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
    <div className="p-6 max-w-5xl mx-auto">
      <TitleLeft title={"Manage Product"} subTitle={"View, edit or delete product from shop..."} />
      {loading ? (
        <p className="text-center text-gray-600 h-96">Loading products...</p>
      ) : (
        <div className="min-h-96 mt-8 overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-600">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="border-b text-gray-600">
                    <td>
                      <figure className="h-14 aspect-square rounded">
                        <img
                          src={product.image}
                          alt="Product"
                          className="w-full h-full object-cover object-center"
                        />
                      </figure>
                    </td>
                    <td className="p-3 text-nowrap">{product.name}</td>
                    <td className="p-3 text-nowrap">${product.price}</td>
                    <td className="p-3 text-nowrap">{product.stock}</td>
                    <td className="p-3 flex flex-nowrap gap-2">
                      <Link
                        href={{
                          pathname: `/products/details/${product._id}`,
                          query: {
                            id: product._id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            description: product.description,
                            stock: product.stock,
                          },
                        }}
                      >
                        <button className="w-9 h-9 aspect-square rounded-full p-1 flex items-center justify-center hover:bg-emerald-500 text-gray-600 hover:text-white text-lg transition">
                          <MdVisibility />
                        </button>
                      </Link>
                      <Link href={`/admin/products/edit/${product._id}`}>
                        <button className="w-9 h-9 aspect-square rounded-full p-1 flex items-center justify-center hover:bg-emerald-500 text-gray-600 hover:text-white text-lg transition">
                          <MdEdit />
                        </button>
                      </Link>
                      <button
                        className="w-9 h-9 aspect-square rounded-full p-1 flex items-center justify-center hover:bg-red-500 text-gray-600 hover:text-white text-lg transition"
                        onClick={() => handleDelete(product._id)}
                      >
                        <MdDelete />
                      </button>
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

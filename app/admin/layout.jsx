"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from "react-icons/fi";
import {
  MdDashboard,
  MdShoppingCart,
  MdPerson,
  MdSettings,
  MdCategory,
  MdAdd,
  MdList,
} from "react-icons/md";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();

  const adminRoutes = [
    { name: "Dashboard", href: "/admin/dashboard", icon: MdDashboard },
    { name: "Orders", href: "/admin/orders", icon: MdShoppingCart },
    { name: "Users", href: "/admin/users", icon: MdPerson },
    { name: "Settings", href: "/admin/settings", icon: MdSettings },
  ];

  const productRoutes = [
    { name: "All Products", href: "/admin/products", icon: MdList },
    { name: "Add Product", href: "/admin/products/add", icon: MdAdd },
  ];

  return (
    <div className="flex min-h-screen bg-gray-500">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex w-64 bg-gray-900 text-white fixed h-full top-0 left-0 shadow-lg">
        <div className="h-full flex flex-col w-full">
          {/* Sidebar Header */}
          <div className="p-5 bg-gray-800 text-lg font-bold">Admin Panel</div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-3">
              {adminRoutes.map(({ name, href, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 p-3 rounded-lg transition ${
                      pathname === href ? "bg-gray-700" : "hover:bg-gray-800"
                    }`}
                  >
                    <Icon size={20} />
                    {name}
                  </Link>
                </li>
              ))}

              {/* Products Dropdown */}
              <li>
                <button
                  onClick={() => setProductsOpen(!productsOpen)}
                  className="w-full flex items-center justify-between p-3 rounded-lg transition hover:bg-gray-800"
                >
                  <span className="flex items-center gap-3">
                    <MdCategory size={20} />
                    Products
                  </span>
                  {productsOpen ? <FiChevronDown /> : <FiChevronRight />}
                </button>

                {productsOpen && (
                  <ul className="ml-6 mt-2 space-y-2">
                    {productRoutes.map(({ name, href, icon: Icon }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className={`flex items-center gap-3 p-2 rounded-lg transition ${
                            pathname === href ? "bg-gray-700" : "hover:bg-gray-800"
                          }`}
                        >
                          <Icon size={18} />
                          {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg z-50 transform transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        {/* Sidebar Header */}
        <div className="p-5 bg-gray-800 flex justify-between items-center">
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <button onClick={() => setSidebarOpen(false)}>
            <FiX size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4">
          <ul className="space-y-3">
            {adminRoutes.map(({ name, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 p-3 rounded-lg transition ${
                    pathname === href ? "bg-gray-700" : "hover:bg-gray-800"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={20} />
                  {name}
                </Link>
              </li>
            ))}

            {/* Products Dropdown */}
            <li>
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className="w-full flex items-center justify-between p-3 rounded-lg transition hover:bg-gray-800"
              >
                <span className="flex items-center gap-3">
                  <MdCategory size={20} />
                  Products
                </span>
                {productsOpen ? <FiChevronDown /> : <FiChevronRight />}
              </button>

              {productsOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  {productRoutes.map(({ name, href, icon: Icon }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className={`flex items-center gap-3 p-2 rounded-lg transition ${
                          pathname === href ? "bg-gray-700" : "hover:bg-gray-800"
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon size={18} />
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Sticky Header for Mobile */}
        <header className="bg-white shadow-md p-4 sticky top-0 z-40 md:hidden flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-700">
            <FiMenu size={24} />
          </button>
          <h1 className="text-lg font-semibold">Admin Panel</h1>
        </header>

        {/* Content Wrapper with Centered Container */}
        <main className="p-6 container mx-auto">{children}</main>
      </div>
    </div>
  );
}

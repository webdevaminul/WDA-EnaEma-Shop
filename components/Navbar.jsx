"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiCreditCardFront } from "react-icons/bi";
import { IoExitOutline, IoOptions } from "react-icons/io5";
import { requestFailure, requestStart, userClearSuccess } from "@/lib/redux/authSlice";
import axios from "axios";
import { clearCart } from "@/lib/redux/cartSlice";
import { clearWishlist } from "@/lib/redux/wishlistSlice";

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useSelector((state) => state.auth);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const navItems = [
    { name: "Products", href: "/products" },
    { name: "Cart", href: "/cart" },
    { name: "Wishlist", href: "/wishlist" },
  ];

  const handleSignOut = async () => {
    try {
      dispatch(requestStart());
      const { data } = await axios.get("/api/auth/signout");
      if (data.success) {
        dispatch(userClearSuccess());
        dispatch(clearCart());
        dispatch(clearWishlist());
        setProfileMenuOpen(false);
        router.push("/");
      }
    } catch (error) {
      dispatch(
        requestFailure(error.response?.data?.message || "Something went wrong. Please try again.")
      );
    }
  };

  return (
    <nav className="bg-gray-800 shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-300">
          EnaEma
        </Link>

        <ul className="flex space-x-6 items-center">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-4 py-2 rounded transition ${
                  pathname === item.href
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}

          {user ? (
            <div className="relative">
              <button
                className="flex items-center justify-center focus:outline-none"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                <img
                  src={user?.profile}
                  alt="User Avatar"
                  className="h-9 w-9 rounded-full object-cover"
                  loading="lazy"
                />
              </button>

              {profileMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white shadow-lg border border-gray-200 rounded-xl py-3 z-50">
                  <div className="px-4 py-2">
                    <p className="font-semibold text-gray-800">Hi, {user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                  <div className="border-t border-gray-200 my-2"></div>

                  {user.role === "admin" && (
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      <BiCreditCardFront className="text-xl mr-2" />
                      Admin Dashboard
                    </Link>
                  )}

                  <Link
                    href="/order-history"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    <IoOptions className="text-xl mr-2" />
                    Order History
                  </Link>

                  <Link
                    href="/account-settings"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    <IoOptions className="text-xl mr-2" />
                    Manage Account
                  </Link>

                  <button
                    onClick={() => {
                      handleSignOut();
                      setProfileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                  >
                    <IoExitOutline className="text-xl mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/signin"
              className="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-700 transition"
            >
              Sign In
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
}

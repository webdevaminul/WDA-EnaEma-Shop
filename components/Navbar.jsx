"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiCart, BiHeart } from "react-icons/bi";
import { IoExitOutline, IoOptions } from "react-icons/io5";
import { requestFailure, requestStart, userClearSuccess } from "@/lib/redux/authSlice";
import { clearCart } from "@/lib/redux/cartSlice";
import { clearWishlist } from "@/lib/redux/wishlistSlice";
import axios from "axios";

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const profileMenuRef = useRef(null);
  const profileImageRef = useRef(null);
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target) &&
        profileImageRef.current &&
        !profileImageRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="border-y container mx-auto flex justify-between items-center gap-1 px-2 py-3 md:p-4 ">
      <Link href="/" className="text-xl md:text-2xl font-semibold text-emerald-600 font-serif mb-1">
        EnaEma
      </Link>

      <ul className={`flex items-center space-x-1 sm:space-x-2 md:space-x-4`}>
        <Link
          href="/products"
          className="text-gray-600 hover:text-emerald-500 md:font-semibold transition"
        >
          Products
        </Link>
        <NavItem href="/cart" icon={<BiCart />} count={cartQuantity} pathname={pathname} />
        <NavItem
          href="/wishlist"
          icon={<BiHeart />}
          count={wishlistItems.length}
          pathname={pathname}
        />

        {user ? (
          <div className="relative border-2 border-gray-600 hover:border-emerald-500 rounded-full aspect-square">
            <button
              ref={profileImageRef}
              className="flex items-center focus:outline-none"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              <img
                src={user?.profile}
                alt="User Avatar"
                className="h-9 w-9 rounded-full object-cover"
                loading="lazy"
              />
            </button>

            {profileMenuOpen && (
              <div ref={profileMenuRef}>
                <ProfileMenu
                  user={user}
                  handleSignOut={handleSignOut}
                  setProfileMenuOpen={setProfileMenuOpen}
                />
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/signin"
            className="px-2 md:px-4 py-2 sm:py-2 rounded-full bg-emerald-600 text-white text-sm md:text-base hover:bg-emerald-500 transition"
          >
            Sign In
          </Link>
        )}
      </ul>
    </nav>
  );
}

const NavItem = ({ href, name, icon, count, pathname }) => (
  <li>
    <Link
      href={href}
      className={`p-2 flex items-center aspect-square hover:bg-emerald-500 rounded-full gap-2 transition ${
        pathname === href ? "bg-emerald-600 text-white" : "text-gray-600 hover:text-white"
      }`}
    >
      {icon && (
        <span className="relative text-lg md:text-xl ">
          {icon}
          {count > 0 && (
            <span className="absolute -bottom-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {count}
            </span>
          )}
        </span>
      )}
      {name}
    </Link>
  </li>
);

const ProfileMenu = ({ user, handleSignOut, setProfileMenuOpen }) => (
  <div className="absolute top-full right-0 mt-2 md:mt-3 w-56 bg-white shadow-lg border border-gray-200 rounded-xl p-2 z-50">
    <div className="px-4 py-2">
      <p className="font-semibold text-gray-600">Hi, {user?.name}</p>
      <p className="text-sm text-gray-600">{user?.email}</p>
    </div>
    <div className="border-t border-gray-200 my-2"></div>

    {user.role === "admin" && (
      <MenuItem
        href="/admin/dashboard"
        label="Admin Dashboard"
        icon={<IoOptions />}
        setProfileMenuOpen={setProfileMenuOpen}
      />
    )}

    <MenuItem
      href="/order-history"
      label="Order History"
      icon={<IoOptions />}
      setProfileMenuOpen={setProfileMenuOpen}
    />
    <MenuItem
      href="/manage-profile"
      label="Manage Profile"
      icon={<IoOptions />}
      setProfileMenuOpen={setProfileMenuOpen}
    />
    <button
      onClick={() => {
        handleSignOut();
        setProfileMenuOpen(false);
      }}
      className="flex items-center w-full p-2 text-sm text-red-600 hover:bg-gray-100 transition"
    >
      <IoExitOutline className="text-xl mr-2" /> Sign Out
    </button>
  </div>
);

const MenuItem = ({ href, label, icon, setProfileMenuOpen }) => (
  <Link
    href={href}
    onClick={() => setProfileMenuOpen(false)}
    className="flex gap-2 items-center p-2 text-sm text-gray-600 hover:bg-gray-100 transition"
  >
    {icon} {label}
  </Link>
);

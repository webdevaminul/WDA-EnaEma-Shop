"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Products", href: "/products" },
    { name: "Cart", href: "/cart" },
    { name: "Orders", href: "/orders" },
  ];

  return (
    <nav className="bg-gray-800 shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-300">
          EnaEma
        </Link>

        <ul className="flex space-x-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-4 py-2 rounded ${
                  pathname === item.href
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/signin"
              className="px-4 py-2 rounded bg-gray-900 text-white hover:text-gray-200"
            >
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

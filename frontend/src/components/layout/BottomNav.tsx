"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiGrid, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { useAppSelector } from "@/store/hooks";

const tabs = [
  { href: "/", icon: FiHome, label: "Home" },
  { href: "/products", icon: FiGrid, label: "Shop" },
  { href: "/wishlist", icon: FiHeart, label: "Wishlist" },
  { href: "/cart", icon: FiShoppingCart, label: "Cart" },
  { href: "/profile", icon: FiUser, label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-lg md:hidden dark:border-slate-800 dark:bg-slate-950/95">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          const isCart = href === "/cart";
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-colors ${
                active
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{label}</span>
              {isCart && cartCount > 0 && (
                <span className="absolute -right-0.5 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

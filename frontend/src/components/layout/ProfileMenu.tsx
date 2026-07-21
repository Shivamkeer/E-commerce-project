"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiPackage,
  FiHeart,
  FiLogOut,
  FiSettings,
  FiChevronDown,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

export default function ProfileMenu() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!isAuthenticated || !user) {
    return (
      <div className="hidden items-center gap-2 sm:flex">
        <Link
          href="/login"
          className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:shadow-indigo-500/40"
        >
          Register
        </Link>
      </div>
    );
  }

  const menuItems = [
    { href: "/profile", icon: FiUser, label: "My Profile" },
    { href: "/orders", icon: FiPackage, label: "My Orders" },
    { href: "/wishlist", icon: FiHeart, label: "Wishlist" },
    { href: "/profile", icon: FiSettings, label: "Settings" },
  ];

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/60 px-3 py-2 text-sm font-semibold backdrop-blur-md transition-all hover:border-indigo-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/60"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
          {user.name.charAt(0).toUpperCase()}
        </span>
        <span className="max-w-[80px] truncate text-slate-700 dark:text-slate-200">{user.name}</span>
        <FiChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} size={14} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/95"
          >
            <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            </div>
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-indigo-950/50"
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                dispatch(logout());
                setOpen(false);
                router.push("/");
              }}
              className="flex w-full items-center gap-3 border-t border-slate-100 px-4 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50 dark:border-slate-800 dark:hover:bg-red-950/30"
            >
              <FiLogOut size={16} />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

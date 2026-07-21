"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiUser,
  FiPackage,
  FiHeart,
  FiLogOut,
  FiShoppingBag,
  FiSettings,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import PageTitle from "@/components/ui/PageTitle";
import Button from "@/components/ui/Button";

const menuItems = [
  { href: "/orders", icon: FiPackage, label: "My Orders" },
  { href: "/wishlist", icon: FiHeart, label: "Wishlist" },
  { href: "/cart", icon: FiShoppingBag, label: "Shopping Cart" },
];

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const cartCount = useAppSelector((state) => state.cart.items.length);
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);

  if (!isAuthenticated || !user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center py-20 text-center"
      >
        <FiUser className="mb-4 text-6xl text-slate-300" />
        <h2 className="text-xl font-bold">Please login to view profile</h2>
        <Link href="/login" className="mt-6">
          <Button>Login Now</Button>
        </Link>
      </motion.div>
    );
  }

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div>
      <PageTitle title="My Profile" subtitle="Manage your account and preferences" />

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 lg:col-span-1"
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-indigo-100 dark:ring-indigo-900">
              <Image src={user.avatar} alt={user.name} fill className="object-cover" sizes="96px" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
            <p className="text-sm text-slate-500">{user.email}</p>
            <p className="text-sm text-slate-500">{user.phone}</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800">
              <p className="text-2xl font-bold text-indigo-600">{cartCount}</p>
              <p className="text-xs text-slate-500">Cart Items</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800">
              <p className="text-2xl font-bold text-indigo-600">{wishlistCount}</p>
              <p className="text-xs text-slate-500">Wishlist</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-3 lg:col-span-2"
        >
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-800"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                <item.icon size={20} />
              </div>
              <span className="font-semibold text-slate-900 dark:text-white">{item.label}</span>
            </Link>
          ))}

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800">
              <FiSettings size={20} />
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">Account Settings</span>
          </div>

          <Button variant="danger" className="w-full" onClick={handleLogout}>
            <FiLogOut size={16} /> Logout
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

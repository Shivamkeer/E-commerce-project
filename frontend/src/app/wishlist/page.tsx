"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { removeFromWishlist } from "@/store/slices/wishlistSlice";
import { formatPrice, getDiscount } from "@/lib/utils";
import PageTitle from "@/components/ui/PageTitle";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.wishlist.items);

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <FiHeart className="mb-4 text-6xl text-slate-300" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Your wishlist is empty
        </h2>
        <p className="mt-2 text-slate-500">Save items you love for later</p>
        <Link href="/products" className="mt-6">
          <Button>Browse Products</Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <div>
      <PageTitle title="My Wishlist" subtitle={`${items.length} saved items`} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          >
            <Link href={`/products/${item.id}`}>
              <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="400px" />
                <Badge variant="success" className="absolute left-3 top-3">
                  {getDiscount(item.price, item.originalPrice)}% OFF
                </Badge>
              </div>
            </Link>
            <div className="p-4">
              <Link href={`/products/${item.id}`}>
                <h3 className="font-semibold text-slate-900 hover:text-indigo-600 dark:text-white">
                  {item.name}
                </h3>
              </Link>
              <p className="mt-2 text-lg font-bold">{formatPrice(item.price)}</p>
              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => dispatch(addToCart(item))}
                >
                  <FiShoppingCart size={14} /> Add to Cart
                </Button>
                <button
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

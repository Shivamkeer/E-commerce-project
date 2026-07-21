"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiX, FiStar, FiShoppingCart, FiHeart } from "react-icons/fi";
import { Product } from "@/types";
import { formatPrice, getDiscount } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((s) => s.wishlist.items);
  const isWishlisted = product ? wishlist.some((i) => i.id === product.id) : false;

  if (!product) return null;
  const discount = getDiscount(product.price, product.originalPrice);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view: ${product.name}`}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
            aria-label="Close"
          >
            <FiX size={18} />
          </button>

          <div className="grid md:grid-cols-2">
            <div className="relative aspect-square bg-slate-50 dark:bg-slate-800">
              <Image src={product.image} alt={product.name} fill className="object-cover" sizes="400px" />
              <Badge variant="success" className="absolute left-4 top-4">{discount}% OFF</Badge>
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">{product.brand}</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{product.name}</h2>
              <div className="mt-2 flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
                  {product.rating} <FiStar className="fill-current" size={10} />
                </span>
                <span className="text-xs text-slate-500">({product.reviews.toLocaleString()} reviews)</span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
                <span className="text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
              </div>
              <p className="mt-4 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">{product.description}</p>
              <div className="mt-6 flex flex-col gap-2">
                <Button variant="secondary" onClick={() => { dispatch(addToCart(product)); onClose(); }}>
                  <FiShoppingCart size={16} /> Add to Cart
                </Button>
                <Button variant="outline" onClick={() => dispatch(toggleWishlist(product))}>
                  <FiHeart className={isWishlisted ? "fill-current text-red-500" : ""} />
                  {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
                <Link href={`/products/${product.id}`} onClick={onClose}>
                  <Button variant="ghost" className="w-full">View Full Details</Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

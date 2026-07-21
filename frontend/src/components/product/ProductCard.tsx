"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiHeart,
  FiShoppingCart,
  FiStar,
  FiEye,
  FiTruck,
  FiZap,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { Product } from "@/types";
import { formatPrice, getDiscount } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import ProductModal from "./ProductModal";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const defaultColors = ["#1e293b", "#6366f1", "#ef4444", "#10b981"];

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const [quickView, setQuickView] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const colors = product.colors || defaultColors;
  const discount = getDiscount(product.price, product.originalPrice);
  const deliveryDays = product.deliveryDays ?? 2;
  const freeDelivery = product.freeDelivery ?? true;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
  const deliveryStr = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ y: -4 }}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-sm transition-shadow hover:border-indigo-200/60 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-indigo-800/60"
      >
        {/* Image area */}
        <div className="relative">
          <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => setQuickView(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg backdrop-blur-md transition-transform hover:scale-110 dark:bg-slate-800/90 dark:text-white"
              aria-label="Quick view"
            >
              <FiEye size={16} />
            </button>
          </div>

          <button
            onClick={() => dispatch(toggleWishlist(product))}
            className={`absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-lg backdrop-blur-md transition-all hover:scale-110 ${
              isWishlisted
                ? "bg-red-500 text-white"
                : "bg-white/90 text-slate-600 dark:bg-slate-800/90 dark:text-slate-300"
            }`}
            aria-label="Toggle wishlist"
          >
            <FiHeart className={isWishlisted ? "fill-current" : ""} size={16} />
          </button>

          <Link href={`/products/${product.id}`}>
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width:768px) 50vw, 25vw"
              />
              {discount > 0 && (
                <Badge variant="success" className="absolute bottom-3 left-3">
                  {discount}% OFF
                </Badge>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="rounded-full bg-red-500 px-4 py-1 text-sm font-bold text-white">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
          </Link>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {product.brand}
            </p>
            <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium capitalize text-slate-500 dark:bg-slate-800">
              {product.category}
            </span>
          </div>

          <Link href={`/products/${product.id}`}>
            <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-slate-900 transition-colors hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400">
              {product.name}
            </h3>
          </Link>

          <div className="mb-2 flex items-center gap-1.5">
            <span className="flex items-center gap-0.5 rounded-md bg-emerald-600 px-1.5 py-0.5 text-xs font-bold text-white">
              {product.rating} <FiStar className="fill-current" size={10} />
            </span>
            <span className="text-xs text-slate-500">({product.reviews.toLocaleString()})</span>
          </div>

          <div className="mb-3 flex flex-wrap items-baseline gap-2">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="text-xs font-semibold text-emerald-600">{discount}% off</span>
          </div>

          {/* Color variants */}
          <div className="mb-3 flex items-center gap-1.5">
            {colors.slice(0, 4).map((color, i) => (
              <button
                key={i}
                onClick={() => setSelectedColor(i)}
                className={`h-5 w-5 rounded-full border-2 transition-transform hover:scale-110 ${
                  selectedColor === i ? "border-indigo-600 scale-110" : "border-slate-200 dark:border-slate-600"
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Color option ${i + 1}`}
              />
            ))}
          </div>

          {/* Delivery info */}
          <div className="mb-4 space-y-1">
            {freeDelivery && (
              <p className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                <FiTruck size={12} /> FREE Delivery
              </p>
            )}
            <p className="flex items-center gap-1 text-xs text-slate-500">
              <FiZap size={12} className="text-amber-500" />
              Get it by {deliveryStr}
            </p>
            <p className="text-xs text-slate-500">
              {product.inStock ? (
                <span className="text-emerald-600">● In Stock</span>
              ) : (
                <span className="text-red-500">● Out of Stock</span>
              )}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-auto grid grid-cols-2 gap-2">
            <button
              onClick={() => dispatch(addToCart(product))}
              disabled={!product.inStock}
              className="flex items-center justify-center gap-1.5 rounded-xl border-2 border-slate-900 py-2.5 text-xs font-bold text-slate-900 transition-all hover:bg-slate-900 hover:text-white active:scale-95 disabled:opacity-50 dark:border-indigo-500 dark:text-white dark:hover:bg-indigo-600"
            >
              <FiShoppingCart size={14} />
              Add to Cart
            </button>
            <button
              onClick={() => {
                dispatch(addToCart(product));
                router.push("/checkout");
              }}
              disabled={!product.inStock}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/40 active:scale-95 disabled:opacity-50"
            >
              Buy Now
            </button>
          </div>
        </div>
      </motion.article>

      {quickView && (
        <ProductModal product={product} onClose={() => setQuickView(false)} />
      )}
    </>
  );
}

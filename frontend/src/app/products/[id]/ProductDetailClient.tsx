"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart, FiStar, FiTruck, FiShield } from "react-icons/fi";
import { getProductById } from "@/data/products";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { formatPrice, getDiscount } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function ProductDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const isWishlisted = product ? wishlist.some((item) => item.id === product.id) : false;
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) notFound();

  const discount = getDiscount(product.price, product.originalPrice);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid gap-8 lg:grid-cols-2 lg:gap-12"
    >
      <div>
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
          <Image
            src={product.images[selectedImage] || product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width:768px) 100vw, 50vw"
          />
          {discount > 0 && (
            <Badge variant="success" className="absolute left-4 top-4">
              {discount}% OFF
            </Badge>
          )}
        </div>
        {product.images.length > 1 && (
          <div className="mt-4 flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`relative h-16 w-16 overflow-hidden rounded-xl border-2 transition-colors ${
                  selectedImage === i
                    ? "border-indigo-600"
                    : "border-transparent hover:border-slate-300"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          {product.brand}
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          {product.name}
        </h1>

        <div className="mt-4 flex items-center gap-3">
          <span className="flex items-center gap-1 rounded-lg bg-emerald-600 px-2 py-1 text-sm font-bold text-white">
            {product.rating} <FiStar className="fill-current" size={12} />
          </span>
          <span className="text-sm text-slate-500">
            {product.reviews.toLocaleString()} ratings
          </span>
        </div>

        <div className="mt-6 flex items-baseline gap-3">
          <span className="text-3xl font-bold text-slate-900 dark:text-white">
            {formatPrice(product.price)}
          </span>
          <span className="text-lg text-slate-400 line-through">
            {formatPrice(product.originalPrice)}
          </span>
          <Badge variant="success">{discount}% off</Badge>
        </div>

        <p className="mt-6 leading-relaxed text-slate-600 dark:text-slate-400">
          {product.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {product.highlights.map((h) => (
            <Badge key={h} variant="info">
              {h}
            </Badge>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <FiTruck className="text-indigo-600" /> Free delivery by tomorrow
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <FiShield className="text-indigo-600" /> 7-day easy return policy
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={() => dispatch(addToCart(product))}
          >
            <FiShoppingCart size={18} />
            Add to Cart
          </Button>
          <Button
            variant={isWishlisted ? "danger" : "outline"}
            size="lg"
            onClick={() => dispatch(toggleWishlist(product))}
          >
            <FiHeart className={isWishlisted ? "fill-current" : ""} />
            {isWishlisted ? "Wishlisted" : "Wishlist"}
          </Button>
        </div>

        <Link
          href="/products"
          className="mt-6 inline-block text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          ← Back to products
        </Link>
      </div>
    </motion.div>
  );
}

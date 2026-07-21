"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import { formatPrice } from "@/lib/utils";
import PageTitle from "@/components/ui/PageTitle";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = items.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-4xl dark:bg-slate-800">
          🛒
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Your cart is empty
        </h2>
        <p className="mt-2 text-slate-500">Add items to get started</p>
        <Link href="/products" className="mt-6">
          <Button>Continue Shopping</Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <div>
      <PageTitle title="Shopping Cart" subtitle={`${items.length} items in your cart`} />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={`/products/${item.id}`}
                    className="font-semibold text-slate-900 hover:text-indigo-600 dark:text-white"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-lg font-bold text-indigo-600">
                    {formatPrice(item.price)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-2 dark:border-slate-700">
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                      }
                      className="p-2 text-slate-600 hover:text-indigo-600"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="min-w-[20px] text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                      }
                      className="p-2 text-slate-600 hover:text-indigo-600"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
                  >
                    <FiTrash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-fit rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Price Details</h3>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Subtotal</span>
              <span>{formatPrice(total + savings)}</span>
            </div>
            <div className="flex justify-between text-emerald-600">
              <span>Discount</span>
              <span>-{formatPrice(savings)}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Delivery</span>
              <span className="text-emerald-600">FREE</span>
            </div>
            <div className="border-t border-slate-200 pt-3 dark:border-slate-700">
              <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-white">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
          <Link href="/checkout" className="mt-6 block">
            <Button variant="secondary" size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

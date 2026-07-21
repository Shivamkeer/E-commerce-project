"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart } from "@/store/slices/cartSlice";
import { formatPrice } from "@/lib/utils";
import PageTitle from "@/components/ui/PageTitle";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const [placed, setPlaced] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0 && !placed) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <h2 className="text-xl font-bold">Nothing to checkout</h2>
        <Link href="/products" className="mt-6">
          <Button>Shop Now</Button>
        </Link>
      </div>
    );
  }

  if (placed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center py-20 text-center"
      >
        <FiCheckCircle className="mb-4 text-6xl text-emerald-500" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Order Placed!</h2>
        <p className="mt-2 text-slate-500">Thank you for shopping with NovaCart</p>
        <div className="mt-8 flex gap-4">
          <Link href="/orders">
            <Button variant="outline">View Orders</Button>
          </Link>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearCart());
    setPlaced(true);
  };

  return (
    <div>
      <PageTitle title="Checkout" subtitle="Complete your order" />
      <div className="grid gap-8 lg:grid-cols-2">
        <motion.form
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handlePlaceOrder}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
        >
          <h3 className="text-lg font-bold">Delivery Address</h3>
          <Input label="Full Name" placeholder="John Doe" required />
          <Input label="Phone" type="tel" placeholder="+91 9876543210" required />
          <Input label="Pincode" placeholder="110001" required />
          <Input label="City" placeholder="New Delhi" required />
          <Input label="State" placeholder="Delhi" required />
          <Input label="Full Address" placeholder="House no, Street, Area" required />
          <Button type="submit" variant="secondary" size="lg" className="w-full mt-4">
            Place Order — {formatPrice(total)}
          </Button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="h-fit rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
        >
          <h3 className="text-lg font-bold">Order Summary</h3>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t border-slate-200 pt-3 dark:border-slate-700">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-indigo-600">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiPackage } from "react-icons/fi";
import { useAppSelector } from "@/store/hooks";
import { formatPrice } from "@/lib/utils";
import PageTitle from "@/components/ui/PageTitle";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const mockOrders = [
  {
    id: "ORD-78421",
    date: "15 Jul 2026",
    status: "Delivered" as const,
    total: 5499,
    items: [
      {
        name: "Nova Pro Wireless Earbuds",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200",
        qty: 1,
      },
    ],
  },
  {
    id: "ORD-78420",
    date: "10 Jul 2026",
    status: "Shipped" as const,
    total: 3299,
    items: [
      {
        name: "PulseRun Performance Sneakers",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
        qty: 1,
      },
    ],
  },
];

const statusVariant = {
  Delivered: "success" as const,
  Shipped: "info" as const,
  Processing: "warning" as const,
  Cancelled: "danger" as const,
};

export default function OrdersPage() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <FiPackage className="mb-4 text-6xl text-slate-300" />
        <h2 className="text-xl font-bold">Login to view orders</h2>
        <Link href="/login" className="mt-6">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageTitle title="My Orders" subtitle={`${mockOrders.length} orders placed`} />
      <div className="space-y-4">
        {mockOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">Order ID: {order.id}</p>
                <p className="text-sm text-slate-500">Placed on {order.date}</p>
              </div>
              <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-slate-100">
                <Image src={order.items[0].image} alt="" fill className="object-cover" sizes="64px" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text-white">
                  {order.items[0].name}
                </p>
                <p className="text-sm text-slate-500">Qty: {order.items[0].qty}</p>
              </div>
              <p className="text-lg font-bold text-indigo-600">{formatPrice(order.total)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

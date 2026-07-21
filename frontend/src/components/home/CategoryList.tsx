"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/data/products";

export default function CategoryList() {
  return (
    <section className="py-8 md:py-12">
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-8 md:gap-4">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
          >
            <Link
              href={`/products?category=${cat.slug}`}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-slate-200/80 bg-white p-3 text-center transition-all hover:border-indigo-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-800"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 text-2xl transition-transform group-hover:scale-110 dark:from-indigo-950 dark:to-violet-950">
                {cat.icon}
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {cat.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

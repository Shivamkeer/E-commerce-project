"use client";

import { use, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import PageTitle from "@/components/ui/PageTitle";

export default function ProductsPageClient({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = use(searchParams);
  const { category, search } = params;

  const filtered = useMemo(() => {
    let result = products;
    if (category) {
      result = result.filter((p) => p.category === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [category, search]);

  return (
    <div>
      <PageTitle
        title={category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : "All Products"}
        subtitle={`${filtered.length} products found`}
      />

      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/products"
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            !category
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products?category=${cat.slug}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              category === cat.slug
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-dashed border-slate-300 py-20 text-center dark:border-slate-700"
        >
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
            No products found
          </p>
          <p className="mt-2 text-sm text-slate-500">Try a different search or category</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

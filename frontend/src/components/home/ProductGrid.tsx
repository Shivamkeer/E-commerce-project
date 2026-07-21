"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  limit?: number;
}

export default function ProductGrid({
  title = "Trending Now",
  subtitle = "Handpicked deals you'll love",
  limit = 8,
}: ProductGridProps) {
  const featured = products.slice(0, limit);

  return (
    <section className="py-8 md:py-12">
      <div className="mb-6 flex items-end justify-between">
        <SectionHeading title={title} subtitle={subtitle} />
        <Link href="/products" className="hidden sm:block">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {featured.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-6 text-center sm:hidden"
      >
        <Link href="/products">
          <Button variant="outline">View All Products</Button>
        </Link>
      </motion.div>
    </section>
  );
}

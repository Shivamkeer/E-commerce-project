import type { Metadata } from "next";
import ProductsPageClient from "./ProductsPageClient";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our complete collection of premium products.",
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  return <ProductsPageClient searchParams={searchParams} />;
}

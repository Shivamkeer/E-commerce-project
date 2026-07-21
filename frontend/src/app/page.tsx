import HeroBanner from "@/components/home/HeroBanner";
import CategoryList from "@/components/home/CategoryList";
import ProductGrid from "@/components/home/ProductGrid";
import TrustBar from "@/components/home/TrustBar";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoryList />
      <ProductGrid />
      <TrustBar />
      <ProductGrid
        title="Best Sellers"
        subtitle="Most loved products this week"
        limit={4}
      />
    </>
  );
}

import { Product } from "@/types";

export const categories = [
  { name: "Mobiles", icon: "📱", slug: "mobiles" },
  { name: "Fashion", icon: "👕", slug: "fashion" },
  { name: "Electronics", icon: "💻", slug: "electronics" },
  { name: "Home", icon: "🏠", slug: "home" },
  { name: "Beauty", icon: "💄", slug: "beauty" },
  { name: "Sports", icon: "⚽", slug: "sports" },
  { name: "Books", icon: "📚", slug: "books" },
  { name: "Grocery", icon: "🛒", slug: "grocery" },
];

export const heroSlides = [
  {
    id: 1,
    title: "Mega Tech Fest",
    subtitle: "Premium gadgets at unbeatable prices. Limited time only.",
    discount: 60,
    badge: "Limited Offer",
    cta: "Shop Now",
    ctaSecondary: "Explore Collection",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1400&q=80",
    href: "/products?category=electronics",
  },
  {
    id: 2,
    title: "Style Refresh Sale",
    subtitle: "Trending fashion picks curated for every occasion.",
    discount: 50,
    badge: "New Season",
    cta: "Shop Fashion",
    ctaSecondary: "View Lookbook",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&q=80",
    href: "/products?category=fashion",
  },
  {
    id: 3,
    title: "Smart Living Deals",
    subtitle: "Transform your home with premium essentials.",
    discount: 45,
    badge: "Home Special",
    cta: "Browse Home",
    ctaSecondary: "Shop Collection",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80",
    href: "/products?category=home",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Nova Pro Wireless Earbuds",
    price: 2499,
    originalPrice: 4999,
    rating: 4.4,
    reviews: 12840,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
      "https://images.unsplash.com/photo-1572569511252-d8f925fe2cbb?w=800&q=80",
    ],
    category: "electronics",
    brand: "NovaAudio",
    description:
      "Premium wireless earbuds with active noise cancellation, 32-hour battery life, and crystal-clear calls.",
    highlights: ["ANC", "32hr Battery", "IPX5 Water Resistant", "Fast Charge"],
    inStock: true,
    colors: ["#1e293b", "#6366f1", "#f8fafc"],
    deliveryDays: 2,
    freeDelivery: true,
  },
  {
    id: "2",
    name: "Apex Ultra Smartphone 5G",
    price: 28999,
    originalPrice: 34999,
    rating: 4.6,
    reviews: 8420,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b09951d3f7e?w=800&q=80",
    ],
    category: "mobiles",
    brand: "Apex",
    description:
      "Flagship 5G smartphone with AMOLED display, 108MP camera, and all-day battery performance.",
    highlights: ["120Hz AMOLED", "108MP Camera", "5G Ready", "67W Fast Charging"],
    inStock: true,
  },
  {
    id: "3",
    name: "Urban Edge Denim Jacket",
    price: 1899,
    originalPrice: 3999,
    rating: 4.2,
    reviews: 3210,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    ],
    category: "fashion",
    brand: "UrbanEdge",
    description:
      "Classic slim-fit denim jacket crafted from breathable cotton blend for everyday style.",
    highlights: ["Cotton Blend", "Slim Fit", "Machine Washable"],
    inStock: true,
  },
  {
    id: "4",
    name: "PulseRun Performance Sneakers",
    price: 3299,
    originalPrice: 5999,
    rating: 4.5,
    reviews: 5670,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    ],
    category: "sports",
    brand: "PulseRun",
    description:
      "Lightweight running shoes with responsive cushioning and breathable mesh upper.",
    highlights: ["Lightweight", "Breathable Mesh", "Anti-Slip Sole"],
    inStock: true,
  },
  {
    id: "5",
    name: "LumiGlow Skincare Kit",
    price: 999,
    originalPrice: 1999,
    rating: 4.3,
    reviews: 2140,
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
    ],
    category: "beauty",
    brand: "LumiGlow",
    description:
      "Complete skincare routine kit with cleanser, serum, and moisturizer for radiant skin.",
    highlights: ["Dermatologist Tested", "Paraben Free", "All Skin Types"],
    inStock: true,
  },
  {
    id: "6",
    name: "ZenBook Air Laptop",
    price: 54999,
    originalPrice: 64999,
    rating: 4.7,
    reviews: 1890,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
    ],
    category: "electronics",
    brand: "ZenBook",
    description:
      "Ultra-slim laptop with Intel i5, 16GB RAM, 512GB SSD, and stunning FHD display.",
    highlights: ["16GB RAM", "512GB SSD", "14\" FHD Display", "Backlit Keyboard"],
    inStock: true,
  },
  {
    id: "7",
    name: "CraftHome Ceramic Vase Set",
    price: 1299,
    originalPrice: 2499,
    rating: 4.1,
    reviews: 980,
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b4d?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1578500494198-246f612d3b4d?w=800&q=80",
    ],
    category: "home",
    brand: "CraftHome",
    description:
      "Handcrafted ceramic vase set of 3, perfect for modern living room decor.",
    highlights: ["Handcrafted", "Set of 3", "Premium Finish"],
    inStock: true,
  },
  {
    id: "8",
    name: "MindSpark Productivity Books Bundle",
    price: 799,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 4520,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
    ],
    category: "books",
    brand: "MindSpark",
    description:
      "Curated bundle of 4 bestselling productivity and self-growth books.",
    highlights: ["Bestsellers", "Paperback Edition", "Gift Ready"],
    inStock: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category?: string): Product[] {
  if (!category) return products;
  return products.filter((p) => p.category === category.toLowerCase());
}

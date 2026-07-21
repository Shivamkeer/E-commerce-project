import { NavCategory } from "@/types";

export const megaMenuCategories: NavCategory[] = [
  {
    name: "Electronics",
    slug: "electronics",
    icon: "💻",
    subcategories: [
      { label: "Laptops", href: "/products?category=electronics&search=laptop" },
      { label: "Headphones", href: "/products?category=electronics&search=earbuds" },
      { label: "Smart Watches", href: "/products?category=electronics" },
      { label: "Cameras", href: "/products?category=electronics" },
    ],
  },
  {
    name: "Mobiles",
    slug: "mobiles",
    icon: "📱",
    subcategories: [
      { label: "Smartphones", href: "/products?category=mobiles" },
      { label: "Cases & Covers", href: "/products?category=mobiles" },
      { label: "Power Banks", href: "/products?category=mobiles" },
      { label: "Chargers", href: "/products?category=mobiles" },
    ],
  },
  {
    name: "Fashion",
    slug: "fashion",
    icon: "👕",
    subcategories: [
      { label: "Men's Wear", href: "/products?category=fashion" },
      { label: "Women's Wear", href: "/products?category=fashion" },
      { label: "Footwear", href: "/products?category=sports" },
      { label: "Accessories", href: "/products?category=fashion" },
    ],
  },
  {
    name: "Home & Living",
    slug: "home",
    icon: "🏠",
    subcategories: [
      { label: "Furniture", href: "/products?category=home" },
      { label: "Decor", href: "/products?category=home" },
      { label: "Kitchen", href: "/products?category=home" },
      { label: "Appliances", href: "/products?category=home" },
    ],
  },
  {
    name: "Beauty",
    slug: "beauty",
    icon: "💄",
    subcategories: [
      { label: "Skincare", href: "/products?category=beauty" },
      { label: "Makeup", href: "/products?category=beauty" },
      { label: "Fragrances", href: "/products?category=beauty" },
      { label: "Hair Care", href: "/products?category=beauty" },
    ],
  },
  {
    name: "Sports",
    slug: "sports",
    icon: "⚽",
    subcategories: [
      { label: "Fitness", href: "/products?category=sports" },
      { label: "Outdoor", href: "/products?category=sports" },
      { label: "Cycling", href: "/products?category=sports" },
      { label: "Team Sports", href: "/products?category=sports" },
    ],
  },
];

export const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
];

export const footerSections = {
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Corporate Info", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Shipping", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Cancellation", href: "#" },
    { label: "Refund Policy", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Sitemap", href: "#" },
  ],
  categories: [
    { label: "Electronics", href: "/products?category=electronics" },
    { label: "Fashion", href: "/products?category=fashion" },
    { label: "Mobiles", href: "/products?category=mobiles" },
    { label: "Home", href: "/products?category=home" },
    { label: "Beauty", href: "/products?category=beauty" },
    { label: "Sports", href: "/products?category=sports" },
  ],
  quickLinks: [
    { label: "Offers & Deals", href: "/products" },
    { label: "Track Order", href: "/orders" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Become a Seller", href: "#" },
  ],
  account: [
    { label: "My Profile", href: "/profile" },
    { label: "My Orders", href: "/orders" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Login", href: "/login" },
    { label: "Sign Up", href: "/signup" },
  ],
};

export const paymentMethods = ["Visa", "MasterCard", "RuPay", "UPI", "PayPal"];
export const trustBadges = ["Secure Checkout", "Verified Seller", "Easy Returns"];

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBell,
  FiChevronDown,
  FiGlobe,
  FiHeart,
  FiHelpCircle,
  FiMapPin,
  FiMenu,
  FiMoon,
  FiPackage,
  FiShoppingCart,
  FiSun,
  FiTag,
  FiX,
  FiUser,
} from "react-icons/fi";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import Logo from "@/components/ui/Logo";
import SearchBar from "./SearchBar";
import CategoryMenu from "./CategoryMenu";
import ProfileMenu from "./ProfileMenu";
import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/store/hooks";
import { languages, megaMenuCategories } from "@/data/navigation";
import { cn } from "@/lib/utils";

const mainNav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/products", label: "Offers", highlight: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const cartCount = useAppSelector((s) => s.cart.items.reduce((sum, i) => sum + i.quantity, 0));
  const wishlistCount = useAppSelector((s) => s.wishlist.items.length);
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [location] = useState("Delhi, 110001");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-slate-200/80 bg-white/85 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85"
          : "border-b border-transparent bg-white/70 backdrop-blur-md dark:bg-slate-950/70"
      )}
    >
      {/* Top utility bar */}
      <div className="hidden border-b border-slate-200/60 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/50 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 text-slate-500">
            <button className="flex items-center gap-1.5 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
              <FiMapPin size={12} />
              Deliver to <span className="font-semibold text-slate-700 dark:text-slate-300">{location}</span>
            </button>
            <Link href="/orders" className="flex items-center gap-1.5 transition-colors hover:text-indigo-600">
              <FiPackage size={12} /> Track Order
            </Link>
            <Link href="#" className="flex items-center gap-1.5 transition-colors hover:text-indigo-600">
              <FiHelpCircle size={12} /> Help
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="flex items-center gap-1.5 font-medium text-indigo-600 hover:text-indigo-500">
              <HiOutlineBuildingStorefront size={14} /> Sell on NovaCart
            </Link>
            <Link href="/products" className="flex items-center gap-1.5 text-orange-600 hover:text-orange-500">
              <FiTag size={12} /> Deals & Offers
            </Link>
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 transition-colors hover:text-indigo-600"
              >
                <FiGlobe size={12} /> {language} <FiChevronDown size={10} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 w-32 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l.label); setLangOpen(false); }}
                      className="block w-full px-3 py-2 text-left text-xs hover:bg-indigo-50 dark:hover:bg-indigo-950"
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-3 md:h-[68px] md:gap-4">
          <Logo />

          <button
            onMouseEnter={() => setMegaOpen(true)}
            onClick={() => setMegaOpen(!megaOpen)}
            className="hidden items-center gap-2 rounded-xl border border-slate-200/80 bg-white/60 px-3 py-2.5 text-sm font-semibold backdrop-blur-md transition-all hover:border-indigo-300 hover:shadow-md lg:flex dark:border-slate-700 dark:bg-slate-900/60"
          >
            <FiMenu size={16} />
            Categories
            <FiChevronDown className={cn("transition-transform", megaOpen && "rotate-180")} size={14} />
          </button>

          <div className="hidden flex-1 lg:block">
            <SearchBar />
          </div>

          <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
            <button
              onClick={toggleTheme}
              className="nav-icon-btn"
              aria-label="Toggle dark mode"
            >
              {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
            </button>

            <Link href="/wishlist" className="nav-icon-btn relative" aria-label="Wishlist">
              <FiHeart size={18} />
              {wishlistCount > 0 && <span className="nav-badge bg-red-500">{wishlistCount}</span>}
            </Link>

            <Link href="/cart" className="nav-icon-btn relative" aria-label="Shopping cart">
              <FiShoppingCart size={18} />
              {cartCount > 0 && <span className="nav-badge bg-indigo-600">{cartCount}</span>}
            </Link>

            <button className="nav-icon-btn relative hidden sm:flex" aria-label="Notifications">
              <FiBell size={18} />
              <span className="nav-badge bg-orange-500">3</span>
            </button>

            <ProfileMenu />

            <Link
              href={isAuthenticated ? "/profile" : "/login"}
              className="nav-icon-btn sm:hidden"
              aria-label="Account"
            >
              <FiUser size={18} />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="nav-icon-btn lg:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        <CategoryMenu open={megaOpen} onClose={() => setMegaOpen(false)} />

        {/* Secondary nav - desktop */}
        <nav className="hidden items-center gap-1 border-t border-slate-200/60 py-2 lg:flex dark:border-slate-800">
          {mainNav.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "relative rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-600 hover:text-indigo-600 dark:text-slate-400",
                link.highlight && "text-orange-600 hover:text-orange-500"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-x-2 -bottom-2 h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-400"
                />
              )}
            </Link>
          ))}
          {megaMenuCategories.slice(0, 5).map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="rounded-lg px-3 py-1.5 text-sm text-slate-500 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-800"
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-200 lg:hidden dark:border-slate-800"
          >
            <div className="space-y-4 px-4 py-4">
              <SearchBar compact />
              <div className="flex flex-wrap gap-2">
                <Link href="/login" className="flex-1 rounded-xl border py-2.5 text-center text-sm font-semibold">Sign In</Link>
                <Link href="/signup" className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-center text-sm font-semibold text-white">Register</Link>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { href: "/", label: "Home" },
                  { href: "/products", label: "Shop" },
                  { href: "/orders", label: "Track Order" },
                  { href: "/wishlist", label: "Wishlist" },
                  { href: "/cart", label: "Cart" },
                  { href: "/profile", label: "Profile" },
                ].map((item) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    className={cn(
                      "rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950"
                        : "bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Categories</p>
              <div className="grid grid-cols-2 gap-2">
                {megaMenuCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/products?category=${cat.slug}`}
                    className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm dark:bg-slate-900"
                  >
                    {cat.icon} {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
